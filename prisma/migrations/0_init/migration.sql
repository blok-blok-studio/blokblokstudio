-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "website" TEXT,
    "noWebsite" BOOLEAN NOT NULL DEFAULT false,
    "problem" TEXT NOT NULL,
    "phone" TEXT,
    "business" TEXT,
    "source" TEXT NOT NULL DEFAULT 'funnel',
    "emailsSent" INTEGER NOT NULL DEFAULT 0,
    "lastEmailAt" TIMESTAMP(3),
    "unsubscribed" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'new',
    "tags" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "verifyResult" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "bounceCount" INTEGER NOT NULL DEFAULT 0,
    "lastBounceAt" TIMESTAMP(3),
    "bounceType" TEXT,
    "complainedAt" TIMESTAMP(3),
    "complaintSource" TEXT,
    "lastEngagedAt" TIMESTAMP(3),
    "engagementScore" INTEGER NOT NULL DEFAULT 0,
    "pipelineStage" TEXT NOT NULL DEFAULT 'new',
    "customFields" TEXT DEFAULT '{}',
    "consentGiven" BOOLEAN NOT NULL DEFAULT false,
    "consentTimestamp" TIMESTAMP(3),
    "consentIp" TEXT,
    "marketingConsent" BOOLEAN NOT NULL DEFAULT false,
    "marketingConsentConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "marketingConsentConfirmedAt" TIMESTAMP(3),
    "marketingConfirmToken" TEXT,
    "marketingConsentAt" TIMESTAMP(3),
    "marketingConsentIp" TEXT,
    "marketingConsentText" TEXT,
    "unsubscribeToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SendingAccount" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "smtpHost" TEXT NOT NULL,
    "smtpPort" INTEGER NOT NULL DEFAULT 587,
    "smtpUser" TEXT NOT NULL,
    "smtpPass" TEXT NOT NULL,
    "dailyLimit" INTEGER NOT NULL DEFAULT 20,
    "sentToday" INTEGER NOT NULL DEFAULT 0,
    "lastResetAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "warmupPhase" INTEGER NOT NULL DEFAULT 1,
    "warmupStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "imapHost" TEXT,
    "imapPort" INTEGER NOT NULL DEFAULT 993,
    "imapUser" TEXT,
    "imapPass" TEXT,
    "sendWindowStart" INTEGER NOT NULL DEFAULT 8,
    "sendWindowEnd" INTEGER NOT NULL DEFAULT 18,
    "sendWeekdays" TEXT NOT NULL DEFAULT '1,2,3,4,5',
    "warmupEnabled" BOOLEAN NOT NULL DEFAULT false,
    "warmupDaily" INTEGER NOT NULL DEFAULT 5,
    "signature" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SendingAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SendingLog" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "sent" INTEGER NOT NULL DEFAULT 0,
    "bounced" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SendingLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailCampaign" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "sentTo" INTEGER NOT NULL DEFAULT 0,
    "totalLeads" INTEGER NOT NULL DEFAULT 0,
    "sentAt" TIMESTAMP(3),
    "scheduledAt" TIMESTAMP(3),
    "leadIds" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "bounceCount" INTEGER NOT NULL DEFAULT 0,
    "bounceThreshold" INTEGER NOT NULL DEFAULT 5,
    "variants" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sequence" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "autoEnroll" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sequence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SequenceStep" (
    "id" TEXT NOT NULL,
    "sequenceId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "delayDays" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "branches" TEXT NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SequenceStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SequenceEnrollment" (
    "id" TEXT NOT NULL,
    "sequenceId" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "currentStep" INTEGER NOT NULL DEFAULT 0,
    "nextSendAt" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SequenceEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailEvent" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "campaignId" TEXT,
    "accountId" TEXT,
    "type" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT NOT NULL DEFAULT '#f97316',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeadList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadListMember" (
    "id" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeadListMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Domain" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "spfRecord" TEXT,
    "dkimSelector" TEXT NOT NULL DEFAULT 'blok',
    "dkimPublicKey" TEXT,
    "dkimPrivateKey" TEXT,
    "dmarcRecord" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "lastCheckAt" TIMESTAMP(3),
    "lastCheckResult" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Domain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InboxMessage" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "leadId" TEXT,
    "fromEmail" TEXT NOT NULL,
    "toEmail" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "bodyPreview" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "isAutoReply" BOOLEAN NOT NULL DEFAULT false,
    "isOOO" BOOLEAN NOT NULL DEFAULT false,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "receivedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InboxMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WarmupLog" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "sent" INTEGER NOT NULL DEFAULT 0,
    "received" INTEGER NOT NULL DEFAULT 0,
    "inbox" INTEGER NOT NULL DEFAULT 0,
    "spam" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WarmupLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "details" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoftBounceQueue" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "campaignId" TEXT,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "retries" INTEGER NOT NULL DEFAULT 0,
    "nextRetry" TIMESTAMP(3) NOT NULL,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SoftBounceQueue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliverabilitySnapshot" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "totalSent" INTEGER NOT NULL DEFAULT 0,
    "totalBounced" INTEGER NOT NULL DEFAULT 0,
    "hardBounces" INTEGER NOT NULL DEFAULT 0,
    "softBounces" INTEGER NOT NULL DEFAULT 0,
    "complaints" INTEGER NOT NULL DEFAULT 0,
    "unsubscribes" INTEGER NOT NULL DEFAULT 0,
    "opens" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "replies" INTEGER NOT NULL DEFAULT 0,
    "bounceRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "complaintRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "unsubRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "openRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeliverabilitySnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlacklistCheck" (
    "id" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "clean" BOOLEAN NOT NULL DEFAULT true,
    "listedOn" TEXT,
    "totalChecked" INTEGER NOT NULL DEFAULT 0,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "autoAction" TEXT,

    CONSTRAINT "BlacklistCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DnsHealthCheck" (
    "id" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "ip" TEXT,
    "spfStatus" TEXT NOT NULL DEFAULT 'unknown',
    "dkimStatus" TEXT NOT NULL DEFAULT 'unknown',
    "dmarcStatus" TEXT NOT NULL DEFAULT 'unknown',
    "ptrStatus" TEXT NOT NULL DEFAULT 'unknown',
    "ptrHostname" TEXT,
    "mxStatus" TEXT NOT NULL DEFAULT 'unknown',
    "mxRecords" TEXT,
    "overall" TEXT NOT NULL DEFAULT 'unknown',
    "details" TEXT,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DnsHealthCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListHygieneLog" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "leadsAffected" INTEGER NOT NULL DEFAULT 0,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ListHygieneLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomFieldDef" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'text',
    "options" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomFieldDef_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedView" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "filters" TEXT NOT NULL DEFAULT '{}',
    "color" TEXT NOT NULL DEFAULT '#f97316',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lead_email_key" ON "Lead"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_marketingConfirmToken_key" ON "Lead"("marketingConfirmToken");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_unsubscribeToken_key" ON "Lead"("unsubscribeToken");

-- CreateIndex
CREATE INDEX "Lead_lastEmailAt_idx" ON "Lead"("lastEmailAt");

-- CreateIndex
CREATE INDEX "Lead_engagementScore_idx" ON "Lead"("engagementScore");

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "Lead"("status");

-- CreateIndex
CREATE INDEX "Lead_verifyResult_idx" ON "Lead"("verifyResult");

-- CreateIndex
CREATE UNIQUE INDEX "SendingAccount_email_key" ON "SendingAccount"("email");

-- CreateIndex
CREATE INDEX "SendingLog_date_idx" ON "SendingLog"("date");

-- CreateIndex
CREATE UNIQUE INDEX "SendingLog_accountId_date_key" ON "SendingLog"("accountId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "SequenceStep_sequenceId_order_key" ON "SequenceStep"("sequenceId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "SequenceEnrollment_sequenceId_leadId_key" ON "SequenceEnrollment"("sequenceId", "leadId");

-- CreateIndex
CREATE INDEX "EmailEvent_leadId_idx" ON "EmailEvent"("leadId");

-- CreateIndex
CREATE INDEX "EmailEvent_campaignId_idx" ON "EmailEvent"("campaignId");

-- CreateIndex
CREATE INDEX "EmailEvent_type_idx" ON "EmailEvent"("type");

-- CreateIndex
CREATE INDEX "EmailEvent_accountId_type_createdAt_idx" ON "EmailEvent"("accountId", "type", "createdAt");

-- CreateIndex
CREATE INDEX "EmailEvent_createdAt_idx" ON "EmailEvent"("createdAt");

-- CreateIndex
CREATE INDEX "LeadListMember_leadId_idx" ON "LeadListMember"("leadId");

-- CreateIndex
CREATE UNIQUE INDEX "LeadListMember_listId_leadId_key" ON "LeadListMember"("listId", "leadId");

-- CreateIndex
CREATE UNIQUE INDEX "Domain_name_key" ON "Domain"("name");

-- CreateIndex
CREATE UNIQUE INDEX "InboxMessage_messageId_key" ON "InboxMessage"("messageId");

-- CreateIndex
CREATE INDEX "InboxMessage_accountId_idx" ON "InboxMessage"("accountId");

-- CreateIndex
CREATE INDEX "InboxMessage_leadId_idx" ON "InboxMessage"("leadId");

-- CreateIndex
CREATE INDEX "InboxMessage_receivedAt_idx" ON "InboxMessage"("receivedAt");

-- CreateIndex
CREATE UNIQUE INDEX "WarmupLog_accountId_date_key" ON "WarmupLog"("accountId", "date");

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "SoftBounceQueue_nextRetry_idx" ON "SoftBounceQueue"("nextRetry");

-- CreateIndex
CREATE INDEX "SoftBounceQueue_leadId_idx" ON "SoftBounceQueue"("leadId");

-- CreateIndex
CREATE INDEX "SoftBounceQueue_retries_nextRetry_idx" ON "SoftBounceQueue"("retries", "nextRetry");

-- CreateIndex
CREATE UNIQUE INDEX "DeliverabilitySnapshot_date_key" ON "DeliverabilitySnapshot"("date");

-- CreateIndex
CREATE INDEX "DeliverabilitySnapshot_date_idx" ON "DeliverabilitySnapshot"("date");

-- CreateIndex
CREATE INDEX "BlacklistCheck_target_idx" ON "BlacklistCheck"("target");

-- CreateIndex
CREATE INDEX "BlacklistCheck_checkedAt_idx" ON "BlacklistCheck"("checkedAt");

-- CreateIndex
CREATE INDEX "DnsHealthCheck_domain_idx" ON "DnsHealthCheck"("domain");

-- CreateIndex
CREATE INDEX "DnsHealthCheck_checkedAt_idx" ON "DnsHealthCheck"("checkedAt");

-- CreateIndex
CREATE UNIQUE INDEX "ListHygieneLog_date_key" ON "ListHygieneLog"("date");

-- CreateIndex
CREATE INDEX "ListHygieneLog_date_idx" ON "ListHygieneLog"("date");

-- CreateIndex
CREATE UNIQUE INDEX "CustomFieldDef_name_key" ON "CustomFieldDef"("name");

-- AddForeignKey
ALTER TABLE "SendingLog" ADD CONSTRAINT "SendingLog_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "SendingAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SequenceStep" ADD CONSTRAINT "SequenceStep_sequenceId_fkey" FOREIGN KEY ("sequenceId") REFERENCES "Sequence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SequenceEnrollment" ADD CONSTRAINT "SequenceEnrollment_sequenceId_fkey" FOREIGN KEY ("sequenceId") REFERENCES "Sequence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadListMember" ADD CONSTRAINT "LeadListMember_listId_fkey" FOREIGN KEY ("listId") REFERENCES "LeadList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarmupLog" ADD CONSTRAINT "WarmupLog_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "SendingAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

