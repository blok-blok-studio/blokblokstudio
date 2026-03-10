"""
Vercel Python Serverless Function: Generate audit PDF.
POST with JSON body {name, email, field, website, problem}
Returns {pdf: <base64-encoded PDF>}
"""
from http.server import BaseHTTPRequestHandler
import json
import base64
import os
import tempfile
from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import simpleSplit
from reportlab.pdfgen import canvas

# === Brand Colors ===
GREEN      = HexColor("#00ff88")
CYAN       = HexColor("#00d4ff")
ORANGE     = HexColor("#ff9f43")
YELLOW     = HexColor("#ffd93d")
RED        = HexColor("#ff4d6a")
PINK       = HexColor("#ff69b4")
PURPLE     = HexColor("#b44dff")
WHITE      = HexColor("#ffffff")
GRAY_LIGHT = HexColor("#cccccc")
GRAY       = HexColor("#999999")
GRAY_DIM   = HexColor("#555555")
GREEN_DARK = HexColor("#0a1f14")
CARD       = HexColor("#111111")
BLACK      = HexColor("#000000")

W, H = letter
ML = 70
MR = W - 70
CW = MR - ML

LOGO_ASPECT = 551.0 / 1026.0


def bg(c):
    c.setFillColor(BLACK)
    c.rect(0, 0, W, H, fill=1, stroke=0)


def draw_logo(c, x, y, w):
    h = w * LOGO_ASPECT
    # On Vercel we won't have the logo file, so use text fallback
    c.setFont("Courier-Bold", 14)
    c.setFillColor(GREEN)
    c.drawString(x, y + h / 2, "blok blok studio")
    return h


def header(c, pg, total):
    c.setFillColor(GREEN)
    c.rect(0, H - 5, W, 5, fill=1, stroke=0)
    logo_w = 80
    logo_h = logo_w * LOGO_ASPECT
    draw_logo(c, ML, H - 28 - logo_h, logo_w)
    c.setFont("Courier", 10)
    c.setFillColor(GRAY)
    c.drawRightString(MR, H - 48, f"{pg:02d} / {total:02d}")
    line_y = H - 28 - logo_h - 8
    c.setStrokeColor(GREEN)
    c.setLineWidth(1)
    c.line(ML, line_y, MR, line_y)
    return line_y - 30


def footer(c):
    c.setStrokeColor(GREEN)
    c.setLineWidth(0.5)
    c.line(ML, 42, MR, 42)
    c.setFont("Courier", 8)
    c.setFillColor(GRAY)
    c.drawCentredString(W / 2, 26, "blokblokstudio.com | @haynes2va | @blokblokstudio")


def badge(c, x, y, text, color):
    c.setFont("Courier-Bold", 8)
    tw = c.stringWidth(text, "Courier-Bold", 8)
    bw = tw + 14
    bh = 18
    c.setFillColor(color)
    c.roundRect(x, y - bh, bw, bh, 3, fill=1, stroke=0)
    c.setFillColor(BLACK)
    c.drawString(x + 7, y - 13, text)
    return bw


def dashed_card(c, x, y, w, h, border_color):
    c.setFillColor(CARD)
    c.setStrokeColor(border_color)
    c.setLineWidth(1.2)
    c.setDash(4, 3)
    c.roundRect(x, y, w, h, 4, fill=1, stroke=1)
    c.setDash()


def color_bar(c, x, y, color, w=30, h=3):
    c.setFillColor(color)
    c.rect(x, y, w, h, fill=1, stroke=0)


def generate_pdf(name, email, field, website, problem, output):
    c = canvas.Canvas(output, pagesize=letter)
    total_pages = 6

    # PAGE 1: COVER
    bg(c)
    c.setFillColor(GREEN)
    c.rect(0, H - 5, W, 5, fill=1, stroke=0)
    badge_text = "CLIENT STRATEGY | BLOK BLOK STUDIO"
    c.setFont("Courier-Bold", 10)
    btw = c.stringWidth(badge_text, "Courier-Bold", 10)
    bx = (W - btw - 20) / 2
    y = H - 70
    c.setFillColor(GREEN_DARK)
    c.setStrokeColor(GREEN)
    c.setLineWidth(1)
    c.roundRect(bx, y, btw + 20, 28, 4, fill=1, stroke=1)
    c.setFillColor(GREEN)
    c.drawCentredString(W / 2, y + 9, badge_text)
    y -= 40
    logo_w = 140
    logo_h = draw_logo(c, (W - logo_w) / 2, y - logo_w * LOGO_ASPECT, logo_w)
    y -= logo_h + 50
    c.setFont("Courier-Bold", 16)
    c.setFillColor(WHITE)
    c.drawCentredString(W / 2, y, "FREE BUSINESS AUDIT")
    y -= 45
    c.setFont("Courier-Bold", 28)
    c.setFillColor(GREEN)
    c.drawCentredString(W / 2, y, name.upper())
    y -= 35
    c.setFont("Courier-Bold", 14)
    c.setFillColor(WHITE)
    c.drawCentredString(W / 2, y, field)
    y -= 35
    c.setStrokeColor(GREEN)
    c.setLineWidth(2)
    c.line(W / 2 - 60, y, W / 2 + 60, y)
    y -= 30
    c.setFont("Courier", 10)
    c.setFillColor(GRAY)
    c.drawCentredString(W / 2, y, "Custom strategy & automation roadmap")
    y -= 16
    c.drawCentredString(W / 2, y, f"Prepared for {name} | {field}")
    draw_logo(c, (W - 110) / 2, 80, 110)
    footer(c)
    c.showPage()

    # PAGE 2: THE PROBLEM
    bg(c)
    y = header(c, 2, total_pages)
    footer(c)
    badge(c, ML, y, "THE CHALLENGE", RED)
    y -= 46
    c.setFont("Courier-Bold", 24)
    c.setFillColor(WHITE)
    c.drawString(ML, y, "Where You Are Now")
    y -= 22
    c.setFont("Courier", 10)
    c.setFillColor(GRAY)
    c.drawString(ML, y, f"Based on your audit submission for {field}")
    y -= 28
    problem_lines = simpleSplit(f'"{problem}"', "Courier", 10, CW - 30)
    card_h = 40 + len(problem_lines) * 14
    dashed_card(c, ML, y - card_h, CW, card_h, RED)
    color_bar(c, ML + 10, y - 10, RED)
    c.setFont("Courier-Bold", 9)
    c.setFillColor(RED)
    c.drawString(ML + 14, y - 24, "YOUR BIGGEST CHALLENGE")
    c.setFont("Courier", 10)
    c.setFillColor(GRAY_LIGHT)
    for i, line in enumerate(problem_lines):
        c.drawString(ML + 14, y - 42 - i * 14, line)
    y -= card_h + 14
    stats = [
        ("67%", "of businesses using AI saw 20%+ revenue growth within 12 months", "McKinsey, 2025", CYAN),
        ("78%", "of leads go cold because businesses take 5+ hours to respond", "InsideSales Research", ORANGE),
        ("10-15 hrs", "per week saved on average when manual workflows are automated", "HubSpot State of AI", YELLOW),
    ]
    for val, desc, source, color in stats:
        desc_lines = simpleSplit(desc, "Courier", 9, CW - 30)
        card_h = 38 + len(desc_lines) * 12 + 14
        if y - card_h < 60:
            break
        dashed_card(c, ML, y - card_h, CW, card_h, color)
        color_bar(c, ML + 10, y - 10, color)
        c.setFont("Courier-Bold", 16)
        c.setFillColor(WHITE)
        c.drawString(ML + 14, y - 28, val)
        c.setFont("Courier", 9)
        c.setFillColor(GRAY_LIGHT)
        for i, line in enumerate(desc_lines):
            c.drawString(ML + 14, y - 44 - i * 12, line)
        c.setFont("Courier", 7)
        c.setFillColor(GRAY_DIM)
        c.drawRightString(MR - 14, y - card_h + 8, f"Source: {source}")
        y -= card_h + 12
    c.showPage()

    # PAGE 3: OPPORTUNITIES
    bg(c)
    y = header(c, 3, total_pages)
    footer(c)
    badge(c, ML, y, "OPPORTUNITIES", GREEN)
    y -= 46
    c.setFont("Courier-Bold", 24)
    c.setFillColor(WHITE)
    c.drawString(ML, y, "What You're Missing")
    y -= 22
    c.setFont("Courier", 10)
    c.setFillColor(GRAY)
    c.drawString(ML, y, "AI & automation opportunities tailored to your business")
    y -= 28
    opportunities = [
        ("Instant Lead Response", f"When someone contacts your {field} business, AI responds in under 60 seconds — qualifying, answering questions, and booking calls on your calendar. No more lost leads from slow follow-up.", GREEN),
        ("Automated Follow-Up Sequences", "Personalized email sequences that nurture leads on autopilot. Each message adapts based on what the lead cares about. Runs 24/7 without you touching it.", CYAN),
        ("AI-Powered Content System", "Turn one idea into 10 pieces of content across platforms. Blog posts, social media, email newsletters — all generated, scheduled, and posted automatically.", ORANGE),
        ("Smart Client Dashboard", "Give your clients a real-time dashboard showing results, progress, and ROI. Builds trust, reduces check-in calls, and makes you look incredibly professional.", PURPLE),
    ]
    for title, desc, color in opportunities:
        desc_lines = simpleSplit(desc, "Courier", 8, CW - 30)
        card_h = 34 + len(desc_lines) * 11 + 10
        if y - card_h < 60:
            break
        dashed_card(c, ML, y - card_h, CW, card_h, color)
        color_bar(c, ML + 10, y - 10, color)
        c.setFont("Courier-Bold", 10)
        c.setFillColor(WHITE)
        c.drawString(ML + 14, y - 26, title)
        c.setFont("Courier", 8)
        c.setFillColor(GRAY_LIGHT)
        for i, line in enumerate(desc_lines):
            c.drawString(ML + 14, y - 42 - i * 11, line)
        y -= card_h + 10
    c.showPage()

    # PAGE 4: ROADMAP
    bg(c)
    y = header(c, 4, total_pages)
    footer(c)
    badge(c, ML, y, "YOUR ROADMAP", CYAN)
    y -= 46
    c.setFont("Courier-Bold", 24)
    c.setFillColor(WHITE)
    c.drawString(ML, y, "The Plan")
    y -= 22
    c.setFont("Courier", 10)
    c.setFillColor(GRAY)
    c.drawString(ML, y, f"A phased approach for {name}'s {field} business")
    y -= 28
    phases = [
        ("WEEK 1-2", "Foundation", "Audit your current tools, set up core integrations, build your AI response system. You'll see results from day one.", GREEN),
        ("WEEK 3-4", "Automation", "Connect your workflows — lead capture, follow-up sequences, content pipeline. Everything runs without manual input.", CYAN),
        ("WEEK 5-6", "Optimization", "Analyze what's working, refine messaging, add advanced features. Scale what converts, cut what doesn't.", ORANGE),
        ("ONGOING", "Growth", "Monthly optimization, new automations as needs evolve, priority support. Your systems get smarter over time.", YELLOW),
    ]
    for tag, title, desc, color in phases:
        desc_lines = simpleSplit(desc, "Courier", 8, CW - 30)
        card_h = 18 + 22 + 14 + len(desc_lines) * 11 + 18
        if y - card_h < 60:
            break
        dashed_card(c, ML, y - card_h, CW, card_h, color)
        badge(c, ML + 12, y - 4, tag, color)
        c.setFont("Courier-Bold", 11)
        c.setFillColor(WHITE)
        c.drawString(ML + 14, y - 42, title)
        c.setFont("Courier", 8)
        c.setFillColor(GRAY_LIGHT)
        for i, line in enumerate(desc_lines):
            c.drawString(ML + 14, y - 58 - i * 11, line)
        y -= card_h + 10
    c.showPage()

    # PAGE 5: WHY US
    bg(c)
    y = header(c, 5, total_pages)
    footer(c)
    badge(c, ML, y, "WHY US", PURPLE)
    y -= 46
    c.setFont("Courier-Bold", 24)
    c.setFillColor(WHITE)
    c.drawString(ML, y, "Built Different")
    y -= 22
    c.setFont("Courier", 10)
    c.setFillColor(GRAY)
    c.drawString(ML, y, "What makes Blok Blok Studio different")
    y -= 28
    reasons = [
        ("We Build Systems, Not Websites", "Most agencies hand you a website and disappear. We build the AI agents, automations, and workflows that actually grow your business.", GREEN),
        ("AI-First Approach", "Every solution leverages AI from the ground up. Not bolted on — built into the core of how your business operates.", CYAN),
        ("Results in Weeks, Not Months", "Our phased approach means measurable results within the first 2 weeks. No 6-month timelines with nothing to show.", ORANGE),
        ("Everything Under One Roof", "AI agents, workflow automation, websites, ads, content systems, dashboards — all from one team that understands how it connects.", PINK),
        ("You Own Everything", "No vendor lock-in. Everything we build, you own. If you ever want to bring it in-house, you can.", YELLOW),
    ]
    for title, desc, color in reasons:
        desc_lines = simpleSplit(desc, "Courier", 8, CW - 30)
        card_h = 30 + len(desc_lines) * 11 + 10
        if y - card_h < 60:
            break
        dashed_card(c, ML, y - card_h, CW, card_h, color)
        color_bar(c, ML + 10, y - 10, color)
        c.setFont("Courier-Bold", 9)
        c.setFillColor(WHITE)
        c.drawString(ML + 14, y - 24, title)
        c.setFont("Courier", 8)
        c.setFillColor(GRAY_LIGHT)
        for i, line in enumerate(desc_lines):
            c.drawString(ML + 14, y - 38 - i * 11, line)
        y -= card_h + 10
    c.showPage()

    # PAGE 6: CTA
    bg(c)
    y = header(c, 6, total_pages)
    footer(c)
    logo_w = 160
    logo_h = draw_logo(c, (W - logo_w) / 2, y - logo_w * LOGO_ASPECT - 10, logo_w)
    y -= logo_h + 50
    c.setFont("Courier-Bold", 20)
    c.setFillColor(WHITE)
    c.drawCentredString(W / 2, y, "Ready to Build")
    y -= 34
    c.setFont("Courier-Bold", 26)
    c.setFillColor(GREEN)
    c.drawCentredString(W / 2, y, "Systems That Scale?")
    y -= 24
    c.setFont("Courier", 10)
    c.setFillColor(GRAY)
    c.drawCentredString(W / 2, y, f"Let's talk about what's possible for your {field} business.")
    y -= 30
    c.setStrokeColor(GREEN)
    c.setLineWidth(2)
    c.line(W / 2 - 50, y, W / 2 + 50, y)
    y -= 35
    btn_w = 300
    btn_h = 42
    btn_x = (W - btn_w) / 2
    c.setFillColor(GREEN)
    c.roundRect(btn_x, y - btn_h, btn_w, btn_h, 4, fill=1, stroke=0)
    c.setFont("Courier-Bold", 12)
    c.setFillColor(BLACK)
    c.drawCentredString(W / 2, y - 18, "BOOK YOUR FREE DISCOVERY CALL")
    c.setFont("Courier", 9)
    c.drawCentredString(W / 2, y - 32, "cal.com/chasehaynes/discovery")
    y -= btn_h + 14
    c.setFillColor(BLACK)
    c.setStrokeColor(GRAY_DIM)
    c.setLineWidth(1)
    c.roundRect(btn_x, y - btn_h, btn_w, btn_h, 4, fill=1, stroke=1)
    c.setFont("Courier-Bold", 12)
    c.setFillColor(WHITE)
    c.drawCentredString(W / 2, y - 18, "VISIT BLOK BLOK STUDIO")
    c.setFont("Courier", 9)
    c.setFillColor(GRAY)
    c.drawCentredString(W / 2, y - 32, "blokblokstudio.com")
    y -= btn_h + 14
    c.setFillColor(BLACK)
    c.setStrokeColor(GRAY_DIM)
    c.roundRect(btn_x, y - btn_h, btn_w, btn_h, 4, fill=1, stroke=1)
    c.setFont("Courier-Bold", 12)
    c.setFillColor(WHITE)
    c.drawCentredString(W / 2, y - 18, "FOLLOW ON INSTAGRAM")
    c.setFont("Courier", 9)
    c.setFillColor(GRAY)
    c.drawCentredString(W / 2, y - 32, "@haynes2va")
    y -= btn_h + 24
    c.setFont("Courier-Bold", 10)
    c.setFillColor(GREEN)
    c.drawCentredString(W / 2, y, "Let's build something that works for you.")
    c.showPage()
    c.save()
    return output


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body = json.loads(self.rfile.read(content_length))

        # Validate required fields
        name = body.get('name', '')
        email = body.get('email', '')
        field = body.get('field', '')
        website = body.get('website', '')
        problem = body.get('problem', '')

        if not all([name, email, field, problem]):
            self.send_response(400)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Missing required fields'}).encode())
            return

        # Generate PDF to temp file
        with tempfile.NamedTemporaryFile(suffix='.pdf', delete=False) as f:
            tmp_path = f.name

        try:
            generate_pdf(name, email, field, website, problem, tmp_path)
            with open(tmp_path, 'rb') as f:
                pdf_bytes = f.read()
            pdf_b64 = base64.b64encode(pdf_bytes).decode('utf-8')

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'pdf': pdf_b64}).encode())
        finally:
            os.unlink(tmp_path)
