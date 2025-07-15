"use client";

import React from "react";

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-white">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <div className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By using this application, you agree to be bound by these Terms and
          Conditions. If you do not agree, please do not use the app.
        </p>

        <h2 className="text-xl font-semibold mb-4">2. User Accounts</h2>
        <ul className="list-disc pl-6 mb-4 text-gray-200">
          <li>
            You are responsible for maintaining the confidentiality of your
            account credentials.
          </li>
          <li>
            You agree to provide accurate and complete information when creating
            an account.
          </li>
          <li>
            You are responsible for all activities that occur under your
            account.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">3. Use of the Service</h2>
        <ul className="list-disc pl-6 mb-4 text-gray-200">
          <li>You agree to use the app only for lawful purposes.</li>
          <li>You will not use the app to harass, abuse, or harm others.</li>
          <li>
            You will not attempt to gain unauthorized access to any part of the
            app or its systems.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">
          4. AI Assistant Limitations
        </h2>
        <ul className="list-disc pl-6 mb-4 text-gray-200">
          <li>
            The AI assistant provides information and suggestions but does not
            offer professional advice (medical, legal, financial, etc.).
          </li>
          <li>Decisions made based on AI responses are your responsibility.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">
          5. Third-Party Integrations
        </h2>
        <ul className="list-disc pl-6 mb-4 text-gray-200">
          <li>
            The app may integrate with third-party services such as Google
            Calendar.
          </li>
          <li>
            By connecting your account, you grant the app permission to access
            and manage your data as described in our Privacy Policy.
          </li>
          <li>
            We are not responsible for the content or practices of third-party
            services.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">6. Data Privacy</h2>
        <p className="mb-4">
          Your privacy is important to us. Please review our{" "}
          <a href="/privacy-policy" className="text-blue-400 underline">
            Privacy Policy
          </a>{" "}
          to understand how we collect, use, and protect your information.
        </p>

        <h2 className="text-xl font-semibold mb-4">7. Intellectual Property</h2>
        <ul className="list-disc pl-6 mb-4 text-gray-200">
          <li>
            All content, trademarks, and intellectual property in the app are
            owned by us or our licensors.
          </li>
          <li>
            You may not copy, modify, distribute, or create derivative works
            without our written permission.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">
          8. Disclaimer of Warranties
        </h2>
        <p className="mb-4">
          The app is provided "as is" and "as available" without warranties of
          any kind. We do not guarantee that the app will be error-free or
          uninterrupted.
        </p>

        <h2 className="text-xl font-semibold mb-4">
          9. Limitation of Liability
        </h2>
        <p className="mb-4">
          To the fullest extent permitted by law, we are not liable for any
          damages arising from your use of the app, including but not limited to
          indirect, incidental, or consequential damages.
        </p>

        <h2 className="text-xl font-semibold mb-4">10. Termination</h2>
        <ul className="list-disc pl-6 mb-4 text-gray-200">
          <li>
            We reserve the right to suspend or terminate your access to the app
            at our discretion, without notice, for conduct that violates these
            Terms or is otherwise harmful.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">11. Changes to Terms</h2>
        <p className="mb-4">
          We may update these Terms and Conditions from time to time. Changes
          will be posted on this page with an updated effective date. Continued
          use of the app constitutes acceptance of the new terms.
        </p>

        <h2 className="text-xl font-semibold mb-4">12. Contact Us</h2>
        <p>
          If you have any questions or concerns about these Terms and
          Conditions, please contact us at{" "}
          <a
            href="mailto:support@example.com"
            className="text-blue-400 underline"
          >
            support@example.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
