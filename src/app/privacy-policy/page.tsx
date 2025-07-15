"use client";

import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-full bg-primary mx-auto px-4 py-12 text-white ">
      <h1 className="text-3xl font-bold mb-6">
        Privacy Policy for Google Calendar Access
      </h1>
      <div className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
        <p className="mb-4">
          This privacy policy explains how we collect, use, and protect your
          information when you grant our application access to your Google
          Calendar. We are committed to safeguarding your privacy and ensuring
          transparency about how your data is handled.
        </p>

        <h2 className="text-xl font-semibold mb-4">2. What Data We Collect</h2>
        <ul className="list-disc pl-6 mb-4 text-gray-200">
          <li>
            Google account basic profile information (name, email, profile
            picture)
          </li>
          <li>
            Google Calendar events (only if you grant explicit permission)
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">3. How We Use Your Data</h2>
        <ul className="list-disc pl-6 mb-4 text-gray-200">
          <li>To display your calendar events within the app</li>
          <li>To help you create, update, or delete events as requested</li>
          <li>To provide personalized scheduling features</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">
          4. Why We Need Calendar Access
        </h2>
        <p className="mb-4">
          We request access to your Google Calendar solely to help you manage
          your events and appointments through our assistant. We do not use your
          calendar data for advertising or share it with third parties.
        </p>

        <h2 className="text-xl font-semibold mb-4">
          5. Data Sharing and Security
        </h2>
        <ul className="list-disc pl-6 mb-4 text-gray-200">
          <li>Your data is never sold or shared with third parties.</li>
          <li>
            We use industry-standard security measures to protect your
            information.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">6. How to Revoke Access</h2>
        <p className="mb-4">
          You can revoke our app's access to your Google Calendar at any time by
          visiting your{" "}
          <a
            href="https://myaccount.google.com/permissions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            Google Account Permissions
          </a>{" "}
          page and removing access for this app.
        </p>

        <h2 className="text-xl font-semibold mb-4">7. Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns about this privacy policy or
          your data, please contact us at{" "}
          <a
            href="mailto:support@example.com"
            className="text-blue-400 underline"
          >
            yohannesdejene23@gmail.com{" "}
          </a>
        </p>

        <h2 className="text-xl font-semibold mb-4">
          8. Changes to This Policy
        </h2>
        <p>
          We may update this privacy policy from time to time. Any changes will
          be posted on this page with an updated effective date.
        </p>
      </div>
    </div>
  );
}
