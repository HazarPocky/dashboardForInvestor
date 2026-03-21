import React, { useState } from 'react';
import {
  HelpCircle,
  Mail,
  Phone,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Send,
  ExternalLink,
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How do I download my K-1 tax forms?',
    answer: 'Navigate to the Documents section from the sidebar. You can find your K-1 forms by filtering by document type "K-1" or searching by deal name. Click the download button next to any document to save it to your device.',
  },
  {
    question: 'When are quarterly reports published?',
    answer: 'Quarterly reports are typically published within 45-60 days after the end of each quarter. You will receive an email notification when new reports are available in your portal.',
  },
  {
    question: 'How do I update my contact information?',
    answer: 'Go to Settings from the sidebar, then select the Profile tab. You can update your name, email, phone number, and other contact details. Click "Save Changes" when you\'re done.',
  },
  {
    question: 'What should I do if I can\'t access a document?',
    answer: 'If you believe you should have access to a document that isn\'t showing in your portal, please contact our investor relations team using the form below or by calling our support line.',
  },
  {
    question: 'How are investment returns calculated?',
    answer: 'Net IRR (Internal Rate of Return) and investment multiples shown in your dashboard are calculated net of all fees and expenses. These figures are updated quarterly based on the most recent fund valuations.',
  },
  {
    question: 'Can I add additional investments through the portal?',
    answer: 'New investment commitments are handled directly through our investor relations team. Please reach out to discuss new investment opportunities and we\'ll guide you through the process.',
  },
];

const HelpPage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.subject.trim() || !contactForm.message.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in both the subject and message fields.',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Message Sent',
      description: 'Our team will get back to you within 1 business day.',
    });
    setContactForm({ subject: '', message: '' });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Help & Support</h2>
        <p className="text-[13px] text-slate-500 mt-1">
          Find answers to common questions or reach out to our investor relations team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* FAQ Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-[15px] font-semibold text-slate-900">Frequently Asked Questions</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full flex items-start justify-between px-6 py-4 text-left hover:bg-slate-50/50 transition-colors"
                  >
                    <span className={`text-[14px] font-medium pr-4 ${openFAQ === index ? 'text-emerald-700' : 'text-slate-900'}`}>
                      {faq.question}
                    </span>
                    {openFAQ === index ? (
                      <ChevronUp size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <ChevronDown size={18} className="text-slate-400 flex-shrink-0 mt-0.5" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-4">
                      <p className="text-[13px] text-slate-600 leading-relaxed bg-slate-50 rounded-lg p-4">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="space-y-5">
          {/* Quick Contact */}
          <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-[15px] font-semibold text-slate-900">Contact Us</h3>
            </div>
            <div className="p-6 space-y-3">
              <a
                href="mailto:ir@apexcapital.com"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
              >
                <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Mail size={16} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-[13px] font-medium text-slate-900 group-hover:text-emerald-700 transition-colors">
                    ir@apexcapital.com
                  </p>
                  <p className="text-[11px] text-slate-400">Investor Relations</p>
                </div>
              </a>
              <a
                href="tel:+12125551234"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
              >
                <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Phone size={16} className="text-emerald-500" />
                </div>
                <div>
                  <p className="text-[13px] font-medium text-slate-900 group-hover:text-emerald-700 transition-colors">
                    (212) 555-1234
                  </p>
                  <p className="text-[11px] text-slate-400">Mon–Fri, 9am–5pm ET</p>
                </div>
              </a>
            </div>
          </div>

          {/* Message Form */}
          <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-[15px] font-semibold text-slate-900">Send a Message</h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Subject</label>
                <input
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  placeholder="What can we help with?"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Message</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Describe your question or issue..."
                  rows={4}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-[13px] font-medium transition-colors"
              >
                <Send size={14} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
