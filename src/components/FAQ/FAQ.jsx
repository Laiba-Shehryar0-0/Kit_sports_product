import { useState } from 'react';
import './FAQ.css';

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
    <section className="faq">
      <div className="container">
        <div className="faq__header">
          <h2 className="section-title section-title--dark">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="faq__list">
          {FAQS.map(({ q, a }, i) => (
            <div key={i} className={`faq__item${openIndex === i ? ' faq__item--open' : ''}`}>
              <button
                className="faq__question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span>{q}</span>
                <span className="faq__icon" aria-hidden="true">
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>
              <div className="faq__answer" aria-hidden={openIndex !== i}>
                <p>{a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
