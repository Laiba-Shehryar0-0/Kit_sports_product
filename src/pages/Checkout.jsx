import { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import KitPreview from '../customize/KitPreview';
import {
  KIT_TYPES, SPORTS, SIZES, DESIGN_TEMPLATES, BASE_PRICES,
  DELIVERY_METHODS, QUANTITY_PRESETS, PAYMENT_METHODS, loadStoredDesign,
} from '../customize/kitShapes';
import {
  IconChevronLeft, IconLock, IconTruck, IconCard, IconBank, IconCash,
  IconShield, IconCheck, IconMinus, IconPlus,
} from '../customize/icons';
import './Checkout.css';

const STEPS = [
  { id: 1, label: 'Design',    status: 'Completed' },
  { id: 2, label: 'Order',     status: 'In Progress' },
  { id: 3, label: 'Delivered', status: 'Est. 7–14 days' },
];

const PROMO_CODES = { SAVE10: 0.1, KITLAB15: 0.15 };

function formatPKR(n) {
  return `PKR ${Math.round(n).toLocaleString('en-US')}`;
}

export default function Checkout() {
  const [design] = useState(loadStoredDesign);
  const navigate = useNavigate();

  const [totalKits, setTotalKits] = useState(11);
  const [primarySize, setPrimarySize] = useState(design.size || 'M');
  const [instructions, setInstructions] = useState('');

  const [contact, setContact] = useState({ firstName: '', lastName: '', email: '', phone: '', clubName: '' });
  const [address, setAddress] = useState({ street: '', city: '', province: '', postalCode: '', country: 'Pakistan' });

  const [deliveryId, setDeliveryId] = useState('express');
  const [paymentId, setPaymentId] = useState('card');
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' });

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(null);
  const [promoError, setPromoError] = useState('');

  const [errors, setErrors] = useState({});
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    if (!placed) return;
    const t = setTimeout(() => setPlaced(false), 3200);
    return () => clearTimeout(t);
  }, [placed]);

  const kitLabel = KIT_TYPES.find(k => k.id === design.kitType)?.label || 'Jersey';
  const templateName = DESIGN_TEMPLATES.find(t => t.id === design.template)?.name || 'Solid';
  const sportLabel = SPORTS.find(s => s.id === design.sport)?.label || 'Football';
  const unitPrice = BASE_PRICES[design.kitType] ?? 2800;
  const delivery = DELIVERY_METHODS.find(d => d.id === deliveryId) ?? DELIVERY_METHODS[0];

  const kitPrice = unitPrice * totalKits;
  const discount = promoApplied ? Math.round(kitPrice * promoApplied) : 0;
  const total = kitPrice + delivery.price - discount;

  const setField = (setter) => (key, value) => setter(prev => ({ ...prev, [key]: value }));
  const setContactField = setField(setContact);
  const setAddressField = setField(setAddress);
  const setCardField = setField(setCard);

  const applyPromo = useCallback(() => {
    const code = promoCode.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setPromoApplied(PROMO_CODES[code]);
      setPromoError('');
    } else {
      setPromoApplied(null);
      setPromoError('Invalid or expired code');
    }
  }, [promoCode]);

  const handlePlaceOrder = useCallback(() => {
    const required = {
      firstName: contact.firstName, lastName: contact.lastName,
      email: contact.email, phone: contact.phone,
      street: address.street, city: address.city,
    };
    const nextErrors = {};
    Object.entries(required).forEach(([key, val]) => { if (!val.trim()) nextErrors[key] = true; });
    if (paymentId === 'card') {
      if (!card.number.trim()) nextErrors.cardNumber = true;
      if (!card.expiry.trim()) nextErrors.cardExpiry = true;
      if (!card.cvv.trim()) nextErrors.cardCvv = true;
      if (!card.name.trim()) nextErrors.cardName = true;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      document.querySelector('.checkout__field--error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setPlaced(true);
  }, [contact, address, paymentId, card]);

  return (
    <div className="checkout">
      <div className="checkout__header">
        <Link to="/customize" className="checkout__back-link">
          <IconChevronLeft /> Back to Studio
        </Link>
        <span className="checkout__secure-badge"><IconLock /> Secure Checkout</span>
      </div>

      <Stepper />

      <div className="checkout__body">
        <main className="checkout__main">
          <Card step={1} title="Kit Summary">
            <div className="checkout__kit-summary">
              <div className="checkout__kit-thumb">
                <KitPreview
                  kitType={design.kitType} bodyColor={design.bodyColor} sleeveColor={design.sleeveColor}
                  numberColor={design.numberColor} collarColor={design.collarColor} opacity={design.opacity}
                  template={design.template} playerName={design.playerName} playerNumber={design.playerNumber}
                  font={design.font} nameSize={design.nameSize} numberSize={design.numberSize}
                  textPosition={design.textPosition} logoDataUrl={design.logoDataUrl} logoPreset={design.logoPreset}
                  logoScale={design.logoScale} logoOpacity={design.logoOpacity} logoPosition={design.logoPosition}
                  side="front" layers={design.layers}
                />
              </div>
              <div className="checkout__kit-facts">
                <FactRow label="Kit Type" value={`${sportLabel} ${kitLabel}`} />
                <FactRow label="Template" value={templateName} />
                <FactRow label="Name / No." value={`${design.playerName || 'PLAYER'} / #${design.playerNumber || '—'}`} />
                <FactRow label="Colors" value={
                  <span className="checkout__color-dots">
                    <i style={{ background: design.bodyColor }} />
                    <i style={{ background: design.sleeveColor }} />
                  </span>
                } />
                <FactRow label="Unit Price" value={formatPKR(unitPrice)} />
                <Link to="/customize" className="checkout__edit-link">Edit in Studio</Link>
              </div>
            </div>
          </Card>

          <Card step={2} title="Quantity & Sizes">
            <div className="checkout__qty-row">
              <div className="checkout__field">
                <label>Total Kits *</label>
                <div className="checkout__stepper">
                  <button onClick={() => setTotalKits(q => Math.max(5, q - 1))} aria-label="Decrease"><IconMinus /></button>
                  <span>{totalKits}</span>
                  <button onClick={() => setTotalKits(q => q + 1)} aria-label="Increase"><IconPlus /></button>
                </div>
              </div>
              <div className="checkout__field">
                <label>Primary Size *</label>
                <select value={primarySize} onChange={e => setPrimarySize(e.target.value)} className="checkout__select">
                  {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <p className="checkout__hint">For mixed sizes, note individual sizes in special instructions. Minimum order: 5 kits.</p>
            <div className="checkout__preset-row">
              {QUANTITY_PRESETS.map(p => (
                <button key={p.label} onClick={() => setTotalKits(p.value)} className={`checkout__pill${totalKits === p.value ? ' checkout__pill--active' : ''}`}>
                  {p.label}
                </button>
              ))}
            </div>
            <div className="checkout__field">
              <label>Special Instructions (optional)</label>
              <textarea
                className="checkout__textarea" rows={3}
                placeholder="e.g. 3×S, 5×M, 2×L, 1×XL or any customisation notes..."
                value={instructions} onChange={e => setInstructions(e.target.value)}
              />
            </div>
          </Card>

          <Card step={3} title="Delivery Details">
            <h4 className="checkout__subhead">Contact Information</h4>
            <div className="checkout__grid-2">
              <TextField label="First Name" required value={contact.firstName} error={errors.firstName} onChange={v => { setContactField('firstName', v); setErrors(e => ({ ...e, firstName: false })); }} />
              <TextField label="Last Name" required value={contact.lastName} error={errors.lastName} onChange={v => { setContactField('lastName', v); setErrors(e => ({ ...e, lastName: false })); }} />
              <TextField label="Email Address" required type="email" placeholder="team@club.com" value={contact.email} error={errors.email} onChange={v => { setContactField('email', v); setErrors(e => ({ ...e, email: false })); }} />
              <TextField label="Phone Number" required placeholder="+92 3XX XXXXXXX" value={contact.phone} error={errors.phone} onChange={v => { setContactField('phone', v); setErrors(e => ({ ...e, phone: false })); }} />
            </div>
            <TextField label="Club / Team Name" placeholder="e.g. FC United Sialkot" value={contact.clubName} onChange={v => setContactField('clubName', v)} />

            <h4 className="checkout__subhead">Shipping Address</h4>
            <TextField label="Street Address" required placeholder="House #, Street, Area" value={address.street} error={errors.street} onChange={v => { setAddressField('street', v); setErrors(e => ({ ...e, street: false })); }} />
            <div className="checkout__grid-3">
              <TextField label="City" required value={address.city} error={errors.city} onChange={v => { setAddressField('city', v); setErrors(e => ({ ...e, city: false })); }} />
              <TextField label="Province" value={address.province} onChange={v => setAddressField('province', v)} />
              <TextField label="Postal Code" value={address.postalCode} onChange={v => setAddressField('postalCode', v)} />
            </div>
            <TextField label="Country" value={address.country} onChange={v => setAddressField('country', v)} />
          </Card>

          <Card step={4} title="Delivery Method">
            <div className="checkout__delivery-list">
              {DELIVERY_METHODS.map(m => (
                <button
                  key={m.id}
                  onClick={() => setDeliveryId(m.id)}
                  className={`checkout__delivery-card${deliveryId === m.id ? ' checkout__delivery-card--active' : ''}`}
                >
                  <span className="checkout__delivery-radio" />
                  <span className="checkout__delivery-info">
                    <span className="checkout__delivery-name">
                      {m.name} {m.popular && <em className="checkout__badge-popular">Popular</em>}
                    </span>
                    <span className="checkout__delivery-desc">{m.days} · {m.desc}</span>
                  </span>
                  <span className="checkout__delivery-price">{m.priceLabel}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card step={5} title="Payment">
            <div className="checkout__payment-tabs">
              {PAYMENT_METHODS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPaymentId(p.id)}
                  className={`checkout__payment-tab${paymentId === p.id ? ' checkout__payment-tab--active' : ''}`}
                >
                  {p.id === 'card' && <IconCard />}
                  {p.id === 'bank' && <IconBank />}
                  {p.id === 'cod' && <IconCash />}
                  {p.label}
                </button>
              ))}
            </div>

            {paymentId === 'card' && (
              <div className="checkout__card-fields">
                <TextField label="Card Number" required placeholder="1234 5678 9012 3456" value={card.number} error={errors.cardNumber} onChange={v => { setCardField('number', v); setErrors(e => ({ ...e, cardNumber: false })); }} />
                <div className="checkout__grid-2">
                  <TextField label="Expiry Date" required placeholder="MM / YY" value={card.expiry} error={errors.cardExpiry} onChange={v => { setCardField('expiry', v); setErrors(e => ({ ...e, cardExpiry: false })); }} />
                  <TextField label="CVV" required placeholder="•••" maxLength={4} value={card.cvv} error={errors.cardCvv} onChange={v => { setCardField('cvv', v); setErrors(e => ({ ...e, cardCvv: false })); }} />
                </div>
                <TextField label="Name on Card" required placeholder="Full name as on card" value={card.name} error={errors.cardName} onChange={v => { setCardField('name', v); setErrors(e => ({ ...e, cardName: false })); }} />
                <p className="checkout__hint checkout__hint--lock"><IconLock /> Your payment details are encrypted with 256-bit SSL. We never store card data.</p>
              </div>
            )}
            {paymentId === 'bank' && (
              <p className="checkout__hint">Bank transfer details will be emailed after you place the order. Orders are produced once payment is confirmed.</p>
            )}
            {paymentId === 'cod' && (
              <p className="checkout__hint">Pay in cash when your kits are delivered. A confirmation call will be made before dispatch.</p>
            )}
          </Card>
        </main>

        <aside className="checkout__sidebar">
          <div className="checkout__summary-card">
            <h3>Order Summary</h3>

            <div className="checkout__summary-item">
              <div className="checkout__summary-thumb">
                <KitPreview
                  kitType={design.kitType} bodyColor={design.bodyColor} sleeveColor={design.sleeveColor}
                  numberColor={design.numberColor} collarColor={design.collarColor} opacity={design.opacity}
                  template={design.template} playerName={design.playerName} playerNumber={design.playerNumber}
                  font={design.font} nameSize={design.nameSize} numberSize={design.numberSize}
                  textPosition={design.textPosition} logoDataUrl={design.logoDataUrl} logoPreset={design.logoPreset}
                  logoScale={design.logoScale} logoOpacity={design.logoOpacity} logoPosition={design.logoPosition}
                  side="front" layers={design.layers}
                />
              </div>
              <div>
                <strong>{sportLabel} {kitLabel} Custom</strong>
                <span>{templateName} Template</span>
                <span>#{design.playerNumber || '—'} {(design.playerName || 'PLAYER').toUpperCase()} · Qty: {totalKits}</span>
              </div>
            </div>

            <div className="checkout__summary-lines">
              <div><span>Kit price (×{totalKits})</span><span>{formatPKR(kitPrice)}</span></div>
              <div><span>{delivery.name}</span><span>{delivery.price === 0 ? 'Free' : formatPKR(delivery.price)}</span></div>
              <div><span>Design fee</span><span className="checkout__free">FREE</span></div>
              {promoApplied && <div><span>Promo discount</span><span className="checkout__discount">-{formatPKR(discount)}</span></div>}
            </div>

            <div className="checkout__summary-total">
              <span>Total</span>
              <strong>{formatPKR(total)}</strong>
            </div>

            <div className="checkout__promo">
              <input
                type="text" placeholder="Promo code" value={promoCode}
                onChange={e => { setPromoCode(e.target.value); setPromoError(''); }}
              />
              <button onClick={applyPromo} className="btn btn-outline">Apply</button>
            </div>
            {promoError && <p className="checkout__promo-error">{promoError}</p>}
            {promoApplied && <p className="checkout__promo-success"><IconCheck /> Code applied — {Math.round(promoApplied * 100)}% off</p>}

            <ul className="checkout__guarantees">
              <li><IconShield /> Quality guarantee on all kits</li>
              <li><IconCheck /> Free revision on printing errors</li>
              <li><IconTruck /> Tracked delivery, door to door</li>
              <li><IconLock /> Secure encrypted payments</li>
            </ul>

            <button onClick={handlePlaceOrder} className="btn btn-green checkout__place-order">
              Place Order
            </button>
            <p className="checkout__terms">
              By placing your order you agree to our <Link to="/contact">Terms of Service &amp; Return Policy</Link>
            </p>
          </div>
        </aside>
      </div>

      {placed && (
        <div className="checkout__toast">
          <IconCheck /> Order placed! Confirmation sent to {contact.email || 'your email'}.
        </div>
      )}
    </div>
  );
}

/* ── Stepper ────────────────────────────────────────────────── */
function Stepper() {
  return (
    <div className="checkout__stepper-bar">
      {STEPS.map((s, i) => (
        <div key={s.id} className={`checkout__step${i < 2 ? ' checkout__step--done' : ''}`}>
          <span className="checkout__step-circle">{i < 1 ? <IconCheck /> : s.id}</span>
          <span className="checkout__step-text">
            <strong>{s.label}</strong>
            <em>{s.status}</em>
          </span>
          {i < STEPS.length - 1 && <span className="checkout__step-line" />}
        </div>
      ))}
    </div>
  );
}

/* ── Small building blocks ─────────────────────────────────── */
function Card({ step, title, children }) {
  return (
    <section className="checkout__card">
      <h2 className="checkout__card-title"><span>{step}</span>{title}</h2>
      {children}
    </section>
  );
}

function FactRow({ label, value }) {
  return (
    <div className="checkout__fact-row">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function TextField({ label, required, type = 'text', placeholder, value, onChange, error, maxLength }) {
  return (
    <div className={`checkout__field${error ? ' checkout__field--error' : ''}`}>
      <label>{label}{required && ' *'}</label>
      <input
        type={type} placeholder={placeholder} value={value} maxLength={maxLength}
        onChange={e => onChange(e.target.value)}
        className="checkout__input"
      />
    </div>
  );
}
