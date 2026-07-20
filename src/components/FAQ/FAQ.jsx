import { useState } from 'react';

const FAQS = [
  {
    q: 'How long does delivery take?',
    a: 'Standard delivery takes 7–10 business days. Express options are available for an additional fee.',
  },
  {
    q: "What's the minimum order quantity?",
    a: 'We accept orders from single pieces. Team discounts start from 5+ pieces.',
  },
  {
    q: 'Do you offer bulk discounts?',
    a: 'Yes! We offer tiered discounts for team orders. Contact us for a custom pricing quote.',
  },
  {
    q: 'Can I return or exchange items?',
    a: 'Exchanges for sizing are accepted within 14 days of delivery. Custom printed items are non-returnable.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(prev => prev === i ? null : i);

  return (
    <section className="bg-light-200 py-24">
      <div className="container">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <h2 className="section-title section-title--dark">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-[760px] mx-auto flex flex-col">
          {FAQS.map(({ q, a }, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`border-b border-light-300 overflow-hidden${i === 0 ? ' border-t' : ''}`}
              >
                <button
                  className={`w-full flex justify-between items-center py-5 px-3 bg-transparent border-none cursor-pointer text-left text-[0.95rem] font-semibold gap-6 rounded-[6px] transition-[color_200ms_ease,background_200ms_ease] hover:text-red hover:bg-[rgba(204,0,0,0.04)]${isOpen ? ' text-red' : ' text-bg-700'}`}
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span>{q}</span>
                  <span className="text-[1.4rem] font-normal text-red flex-shrink-0 w-6 text-center" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-[max-height_400ms_ease]${isOpen ? ' max-h-[300px]' : ' max-h-0'}`}
                  aria-hidden={!isOpen}
                >
                  <p className="pt-0 px-2 pb-5 text-[0.875rem] text-light-700 leading-[1.75]">{a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
