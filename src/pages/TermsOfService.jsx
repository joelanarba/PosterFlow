import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
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
            Terms of Service
          </h1>
          <p className="text-gray-400">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing or using PosterFlow ("Service," "Platform," "we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"). 
              If you disagree with any part of these terms, you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Service Description</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              PosterFlow is an AI-powered design platform that enables users to create professional posters, flyers, and social media graphics. Our Service includes:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>AI-generated backgrounds using machine learning models</li>
              <li>Design editor with text, shapes, and customization tools</li>
              <li>Social media sizing presets (Instagram, Facebook, Twitter, etc.)</li>
              <li>Export and download functionality</li>
              <li>Cloud storage for your designs</li>
              <li>Credit-based pricing system with Paystack payment integration</li>
            </ul>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">3.1 Account Creation</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              To use certain features of the Service, you must create an account. You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept all responsibility for activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">3.2 Account Eligibility</h3>
            <p className="text-gray-300 leading-relaxed">
              You must be at least 13 years old to use this Service. By registering, you represent that you are of legal age to form a binding contract with PosterFlow.
            </p>
          </section>

          {/* Credits and Pricing */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Credits and Pricing</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">4.1 Credit System</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              PosterFlow operates on a credit-based system:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li>Credits are used to generate AI backgrounds and access premium features</li>
              <li>Each AI background generation costs 1 credit</li>
              <li>Credits can be purchased through our marketplace using Paystack</li>
              <li>Credits are non-refundable and non-transferable</li>
              <li>Credits do not expire unless your account is terminated</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">4.2 Payments</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              All payments are processed securely through Paystack. By making a purchase, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Pay all charges at the prices then in effect</li>
              <li>Provide current, complete, and accurate payment information</li>
              <li>Authorize us to charge your payment method for the total amount</li>
              <li>Accept that prices are subject to change with notice</li>
            </ul>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Acceptable Use Policy</h2>
            <p className="text-gray-300 leading-relaxed mb-4">You agree NOT to use the Service to:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Violate any laws, regulations, or third-party rights</li>
              <li>Create content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable</li>
              <li>Generate content that infringes intellectual property rights</li>
              <li>Distribute spam, viruses, or malicious code</li>
              <li>Attempt to gain unauthorized access to the Service or related systems</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Use automated systems (bots, scrapers) without permission</li>
              <li>Impersonate any person or entity</li>
              <li>Resell or redistribute the Service without authorization</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property Rights</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">6.1 Your Content</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              You retain all rights to the designs and content you create using PosterFlow. By using the Service, you grant us a limited, 
              worldwide, non-exclusive license to host, store, and display your content solely for the purpose of providing the Service.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">6.2 AI-Generated Content</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Content generated by our AI models is owned by you, subject to the following:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li>You are responsible for ensuring AI-generated content doesn't infringe third-party rights</li>
              <li>We do not claim ownership of AI-generated backgrounds you create</li>
              <li>AI models are provided by third-party services (HuggingFace) subject to their terms</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">6.3 Platform Content</h3>
            <p className="text-gray-300 leading-relaxed">
              The Service itself, including all software, design, text, graphics, and other content (excluding user-generated content), 
              is the property of PosterFlow and is protected by copyright, trademark, and other laws.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Disclaimer and Limitation of Liability</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">7.1 Service "As Is"</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, 
              FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. We do not guarantee that:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li>The Service will be uninterrupted, secure, or error-free</li>
              <li>AI-generated content will meet your expectations or requirements</li>
              <li>Any errors will be corrected</li>
              <li>The Service will be compatible with all devices or browsers</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">7.2 Limitation of Liability</h3>
            <p className="text-gray-300 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, POSTERFLOW SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, 
              OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, OR GOODWILL ARISING OUT OF YOUR USE OF THE SERVICE.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Termination</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">8.1 Your Rights</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              You may terminate your account at any time by contacting us or using account deletion features. Upon termination, your right to use the Service will immediately cease.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">8.2 Our Rights</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              We may suspend or terminate your account at any time, with or without notice, for conduct that we believe:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li>Violates these Terms or our Acceptable Use Policy</li>
              <li>Is harmful to other users, us, or third parties</li>
              <li>Exposes us to potential legal liability</li>
              <li>Is fraudulent or involves misuse of the Service</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">8.3 Effect of Termination</h3>
            <p className="text-gray-300 leading-relaxed">
              Upon termination, you will lose access to your account and designs. We may delete your data after a reasonable period. 
              Unused credits are non-refundable upon termination.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Changes to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of material changes by email or through the Service. 
              Your continued use after changes constitutes acceptance of the new Terms. If you disagree with the changes, you must stop using the Service.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Governing Law and Dispute Resolution</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with the laws of Ghana, without regard to conflict of law provisions. 
              Any disputes arising from these Terms or your use of the Service shall be resolved through:
            </p>
            <ol className="list-decimal list-inside text-gray-300 space-y-2">
              <li>Good faith negotiations between the parties</li>
              <li>Mediation, if negotiations fail</li>
              <li>The courts of Ghana, if mediation is unsuccessful</li>
            </ol>
          </section>

          {/* Miscellaneous */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Miscellaneous</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">11.1 Entire Agreement</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and PosterFlow.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">11.2 Severability</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">11.3 Waiver</h3>
            <p className="text-gray-300 leading-relaxed">
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Contact Information</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <p className="text-gray-300">Email: <a href="mailto:legal@posterflow.com" className="text-pink-500 hover:underline">legal@posterflow.com</a></p>
              <p className="text-gray-300 mt-2">Support: <a href="mailto:support@posterflow.com" className="text-pink-500 hover:underline">support@posterflow.com</a></p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
