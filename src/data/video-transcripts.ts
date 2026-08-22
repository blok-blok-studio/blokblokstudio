/**
 * Transcripts for the self-hosted videos.
 *
 * Produced locally with whisper.cpp (large-v3-turbo) from the shipped mp4s,
 * then lightly edited: the brand name corrected (the model consistently hears
 * "Block Block Studio"), sentence punctuation restored, and pure disfluencies
 * dropped. No wording was changed, added, or reordered.
 *
 * These are the only text a search engine or an AI assistant will ever have
 * for what is actually said in these videos. They feed three places:
 * VideoObject.transcript, the visible transcript on the page, and
 * /llms-full.txt. The timed caption tracks are the .en.vtt files next to each
 * mp4 in public/videos.
 *
 * The two client testimonials are a real person's words about their own
 * business. Correct anything that reads wrong here rather than leaving it —
 * this file is the single place it needs fixing.
 */

import type { SiteVideoKey } from './videos';

export const VIDEO_TRANSCRIPTS: Record<SiteVideoKey, string> = {
  pitch: `Chase Haynes here, and I've helped people make over $250,000, and it is your turn next. I want you on that yacht. I want you on that beach. I want you out of the rat race. I want you to build a business so dang well that you can't even believe it.

I am here for you. You found me somehow — on Instagram, through LinkedIn, through my website. Wherever you came from, I don't know you, but I want to get to know you.

Scroll through this funnel. Free fact: this is what we call a funnel page. A funnel page is what helps people generate leads, and then converts, and then gets a sale, right? So go through this funnel page, listen to this video, read everything about me and what I've done and how I can help you.

At the bottom, there's a form. Fill that out. I'll have your information. I'll do a free audit for your website, and if you don't have a website, we'll book a call and we'll talk about it, and where you are and how you can move forward.

I'm here for you. I'm here to help you. Let's get it started. Chase out. Have a good one.`,

  kofi: `I've been working with Chase for my website now, and it turned out completely insane. Gave me that Apple logo, Apple design. The things pop up really nicely. The website has a smooth finish.

I personally like one pages. We decided on that. Communication with him is really easy. He's a good man, man. Very determined.

And I think you need someone to work with you on your outer layer of software. You need someone that's responsive, and knows his things, and can adapt to your needs.

Yeah, so I'd really recommend Chase, or Blok Blok Studio. Working with them really helped me. Yeah, man. Give them a try. They're really good.`,

  luki: `I'm a personal trainer based in Berlin, and I stumbled across Chase, or Blok Blok Studio, through a friend of mine who worked with Chase before. So I hopped on a call with him and we talked about my goals, my vision for the website, and I felt like I was understood right off the bat. It was a very familiar vibe too, which made working with Chase a lot more easygoing, that's for sure.

Chase is just an overall great guy who is very patient with you. We worked together during a time where I had a lot going on personally, and he was very patient with me, making sure I was staying on track and guiding me through the whole process without making me feel overwhelmed, which was a great highlight for me.

His communication skills are great, he's very responsive, it's a big plus. I had a lot of ideas I wanted to implement into the website, and he went through these ideas, these visions I had for the website, and made sure that they fit the brand identity, and never really dismissed any ideas. So that was a great highlight of mine.

Through the whole process I just felt seen, I felt heard, I felt like I was being involved in the whole process, and most importantly I felt genuinely taken care of. And that isn't the norm nowadays anymore, I would say.

What I love most about the website is it's not just another template anyone can throw together. There's a lot of intention that went into it. We focused on the customer journey, the user experience, and made sure that the website, the brand identity, looked authentic and memorable.

So if you're looking for someone who takes care of you, who focuses on the details, and who's there for you, who's responsive — you're definitely in the right place with Chase, or Blok Blok Studio in this case.`,

  founder: `My name is Chase, the founder of Blok Blok Studio. I can tell you all the case studies in the world for our business, but if you don't know me as a person, it doesn't even matter. So I'm going to introduce myself.

My name is Chase. I'm from San Diego, California. I grew up a lot in the U.S., ended up on the East Coast. I joined the Marine Corps, I was in for five years. Got out, moved up to New York City to Parsons School of Design. Got my degree, a Bachelor's of Fine Arts in Design and Technology. After that, founded my agency, Blok Blok Studio, in June of 2024. Then I moved out to Berlin, Germany about a year later.

From there, we've just been scaling the business. It's been growing, everything is ramping up. We have a team of four people now. I've got my creative director in Virginia, my marketing strategist out in L.A., and my full stack dev here in Berlin, Germany. It's been an amazing ride, and we're here every single day kicking it.

Would love to work with you. Below, you're going to see a bunch of case studies. You're going to see four examples of the work we've done. Go through it, check it out. If you've got questions, let me know on Instagram or email, whatever works best for you.

Below that, we've got a lead form. Just put all your information in. It comes straight to me, I'll check it out, we'll hop on a call, we'll see if it works. If it works, great. If not, it is what it is. But I'm really looking forward to meeting you, and you guys have a great day. Talk to you later.`,
};

/** Collapses the paragraph breaks for schema.org, which wants a plain string. */
export function transcriptAsPlainText(key: SiteVideoKey): string {
  return VIDEO_TRANSCRIPTS[key].split('\n\n').join(' ').replace(/\s+/g, ' ').trim();
}
