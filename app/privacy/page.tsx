import React from "react";

export default function PrivacyPage() {
  return (
    <main className="w-full">
      <section className="bg-[#2D5A27] py-20 px-6 text-center">
        <h1 className="heading-section text-white">PRIVACY POLICY</h1>
      </section>

      <section className="bg-[#FFF8F0] py-16 px-6">
        <div className="max-w-[800px] mx-auto prose prose-green prose-lg font-[family-name:var(--font-dm-sans)] text-[#1A1A1A]/80">
          <p className="font-bold">Last Updated: October 2023</p>

          <h2 className="heading-sub text-[#2D5A27] mt-10 mb-4">1. Information We Collect</h2>
          <p>
            When you visit the site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.
          </p>
          <p>
            When you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information, email address, and phone number. We refer to this information as "Order Information."
          </p>

          <h2 className="heading-sub text-[#2D5A27] mt-10 mb-4">2. How We Use Your Information</h2>
          <p>
            We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).
          </p>
          <p>
            Additionally, we use this Order Information to:
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Communicate with you;</li>
              <li>Screen our orders for potential risk or fraud; and</li>
              <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
            </ul>
          </p>

          <h2 className="heading-sub text-[#2D5A27] mt-10 mb-4">3. Cookies</h2>
          <p>
            We use cookies to help us remember and process the items in your shopping cart, understand and save your preferences for future visits, and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.
          </p>

          <h2 className="heading-sub text-[#2D5A27] mt-10 mb-4">4. SMS / Text Messaging</h2>
          <p>
            If you provide your phone number and consent to receive text messages, we will use it to send you promotional messages, farmers market schedule updates, new product announcements, and order-related notifications from Root Soulutions.
          </p>
          <p className="mt-3">
            Message frequency varies. Message and data rates may apply. You can opt out of SMS messages at any time by replying <strong>STOP</strong> to any message. Reply <strong>HELP</strong> for assistance. Carriers are not liable for delayed or undelivered messages.
          </p>
          <p className="mt-3">
            We use Twilio to deliver text messages on our behalf. Your phone number is shared with Twilio solely for the purpose of message delivery and is not sold or shared with any other third party for marketing purposes.
          </p>

          <h2 className="heading-sub text-[#2D5A27] mt-10 mb-4">5. Sharing Your Personal Information</h2>
          <p>
            We share your Personal Information with third parties to help us use your Personal Information, as described above. We use Shopify to power our online store, Twilio to deliver SMS messages, and Google Analytics to help us understand how our customers use the Site. We do not sell your personal information to third parties.
          </p>

          <h2 className="heading-sub text-[#2D5A27] mt-10 mb-4">6. Contact Us</h2>
          <p>
            For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by email at hello@rootsoulutions.com or by mail using the details provided below:
          </p>
          <p className="mt-4 font-bold">
            Craft Eatery Food Genius Company L.L.C.<br />
            1451 S Elm Eugene St, Greensboro, NC 27406<br />
            (862) 315-3802
          </p>
        </div>
      </section>
    </main>
  );
}
