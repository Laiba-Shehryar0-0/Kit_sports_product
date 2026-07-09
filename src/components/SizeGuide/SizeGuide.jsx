import './SizeGuide.css';

const SIZES = [
  { size: 'Small',  chest: '34–36', waist: '28–30', length: '26–28' },
  { size: 'Medium', chest: '38–40', waist: '32–34', length: '28–30' },
  { size: 'Large',  chest: '42–44', waist: '36–38', length: '30–32' },
  { size: 'XL',     chest: '46–48', waist: '40–42', length: '32–34' },
];

const STEPS = [
  {
    num: '1',
    label: 'Chest',
    icon: '📏',
    desc: 'Measure around the fullest part of your chest',
  },
  {
    num: '2',
    label: 'Waist',
    icon: '📐',
    desc: 'Measure around your natural waistline',
  },
  {
    num: '3',
    label: 'Length',
    icon: '📌',
    desc: 'Measure from shoulder to desired hem length',
  },
];

export default function SizeGuide() {
  return (
    <section className="size-guide">
      <div className="size-guide__left">
        <div className="size-guide__left-inner">
          <h2 className="section-title">Size Guide</h2>

          <div className="size-guide__table-wrap">
            <table className="size-guide__table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Chest (in)</th>
                  <th>Waist (in)</th>
                  <th>Length (in)</th>
                </tr>
              </thead>
              <tbody>
                {SIZES.map(({ size, chest, waist, length }) => (
                  <tr key={size}>
                    <td>{size}</td>
                    <td>{chest}</td>
                    <td>{waist}</td>
                    <td>{length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="size-guide__right">
        <div className="size-guide__right-inner">
          <h2 className="section-title size-guide__measure-title">How to Measure</h2>
          <div className="size-guide__steps">
            {STEPS.map(({ num, label, icon, desc }) => (
              <div key={num} className="size-guide__step">
                <div className="size-guide__step-num">{num}</div>
                <div className="size-guide__step-content">
                  <strong>{label}</strong>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
