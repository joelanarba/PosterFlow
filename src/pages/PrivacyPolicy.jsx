import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-8"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-400">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p className="text-gray-300 leading-relaxed">
              Welcome to PosterFlow ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you about how we look after your personal data when you visit our website and use our services, 
              and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            <p className="text-gray-300 leading-relaxed mb-4">We collect and process the following types of information:</p>
            
            <h3 className="text-xl font-semibold text-white mb-3">2.1 Information You Provide</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li>Account information (name, email address) when you register</li>
              <li>Payment information when you purchase credits (processed securely by Paystack)</li>
              <li>Content you create (poster designs, text, images)</li>
              <li>Communications with us (support requests, feedback)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">2.2 Automatically Collected Information</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li>Usage data (features used, time spent, interactions)</li>
              <li>Device information (browser type, IP address, operating system)</li>
              <li>Cookies and similar tracking technologies (see Cookie Policy below)</li>
              <li>Analytics data via Google Analytics 4</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-300 leading-relaxed mb-4">We use your information for the following purposes:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><strong>Service Provision:</strong> To provide and maintain our poster design service</li>
              <li><strong>AI Generation:</strong> To process your prompts and generate backgrounds using HuggingFace AI models</li>
              <li><strong>Account Management:</strong> To manage your account and credits</li>
              <li><strong>Payment Processing:</strong> To process transactions via Paystack</li>
              <li><strong>Analytics:</strong> To understand how users interact with our service and improve it</li>
              <li><strong>Communication:</strong> To send you service-related notifications</li>
              <li><strong>Security:</strong> To detect and prevent fraud, abuse, and security issues</li>
            </ul>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Services</h2>
            <p className="text-gray-300 leading-relaxed mb-4">We use the following third-party services that may collect and process your data:</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">4.1 Firebase (Google)</h3>
                <p className="text-gray-300">For authentication, database, storage, and hosting. See <a href="https://firebase.google.com/support/privacy" className="text-pink-500 hover:underline" target="_blank" rel="noopener noreferrer">Firebase Privacy Policy</a></p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">4.2 Google Analytics 4</h3>
                <p className="text-gray-300">For usage analytics and understanding user behavior. See <a href="https://policies.google.com/privacy" className="text-pink-500 hover:underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">4.3 Paystack</h3>
                <p className="text-gray-300">For payment processing. We do not store your payment card details. See <a href="https://paystack.com/privacy" className="text-pink-500 hover:underline" target="_blank" rel="noopener noreferrer">Paystack Privacy Policy</a></p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">4.4 HuggingFace</h3>
                <p className="text-gray-300">For AI image generation. Your prompts are sent to HuggingFace for processing. See <a href="https://huggingface.co/privacy" className="text-pink-500 hover:underline" target="_blank" rel="noopener noreferrer">HuggingFace Privacy Policy</a></p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">4.5 Sentry</h3>
                <p className="text-gray-300">For error monitoring and performance tracking. See <a href="https://sentry.io/privacy/" className="text-pink-500 hover:underline" target="_blank" rel="noopener noreferrer">Sentry Privacy Policy</a></p>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="text-gray-300 leading-relaxed mb-4">We use cookies and similar tracking technologies to:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li><strong>Essential Cookies:</strong> Required for authentication and basic functionality</li>
              <li><strong>Analytics Cookies:</strong> Google Analytics to understand usage patterns (requires consent)</li>
              <li><strong>Preference Cookies:</strong> To remember your settings and preferences</li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              You can control cookies through our cookie consent banner and your browser settings. Note that disabling essential cookies may affect functionality.
            </p>
          </section>

          {/* Data Storage and Security */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Data Storage and Security</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Your data is stored securely using Firebase infrastructure with industry-standard encryption:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Data is encrypted in transit using HTTPS/TLS</li>
              <li>Data at rest is encrypted by Firebase</li>
              <li>Access to data is restricted by Firebase Security Rules</li>
              <li>We implement rate limiting to prevent abuse</li>
              <li>Regular security audits and monitoring via Sentry</li>
            </ul>
          </section>

          {/* Your Rights (GDPR) */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Your Privacy Rights (GDPR Compliance)</h2>
            <p className="text-gray-300 leading-relaxed mb-4">Under GDPR and other privacy laws, you have the following rights:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
              <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
              <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
              <li><strong>Right to Data Portability:</strong> Receive your data in a structured format</li>
              <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for analytics/marketing at any time</li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              To exercise these rights, please contact us at <a href="mailto:privacy@posterflow.com" className="text-pink-500 hover:underline">privacy@posterflow.com</a>
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Data Retention</h2>
            <p className="text-gray-300 leading-relaxed">
              We retain your personal data only for as long as necessary to provide our services and comply with legal obligations:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
              <li>Account data: Until you delete your account</li>
              <li>Design/poster data: Until you delete them or your account</li>
              <li>Payment records: 7 years for tax/accounting purposes</li>
              <li>Analytics data: 26 months (Google Analytics default)</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
            <p className="text-gray-300 leading-relaxed">
              Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. 
              If you are a parent or guardian and believe your child has provided us with personal data, please contact us.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Privacy Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page 
              and updating the "Last updated" date. We encourage you to review this policy periodically.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <p className="text-gray-300">Email: <a href="mailto:privacy@posterflow.com" className="text-pink-500 hover:underline">privacy@posterflow.com</a></p>
              <p className="text-gray-300 mt-2">For GDPR-related inquiries: <a href="mailto:gdpr@posterflow.com" className="text-pink-500 hover:underline">gdpr@posterflow.com</a></p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
