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
    <section className="grid grid-cols-2 min-h-[580px]">
      <div className="bg-surface-900 flex items-center">
        <div className="py-16 px-12 max-w-[600px] m-auto w-full flex flex-col items-start justify-center gap-10 max-[900px]:py-12 max-[900px]:px-6 max-[900px]:max-w-full max-[900px]:m-0">
          <h2 className="section-title">Size Guide</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[0.875rem]">
              <thead>
                <tr>
                  <th className="bg-surface-600 text-onsurface-500 text-[10px] font-bold tracking-[1.5px] uppercase py-3 px-4 text-left border-b border-line">Size</th>
                  <th className="bg-surface-600 text-onsurface-500 text-[10px] font-bold tracking-[1.5px] uppercase py-3 px-4 text-left border-b border-line">Chest (in)</th>
                  <th className="bg-surface-600 text-onsurface-500 text-[10px] font-bold tracking-[1.5px] uppercase py-3 px-4 text-left border-b border-line">Waist (in)</th>
                  <th className="bg-surface-600 text-onsurface-500 text-[10px] font-bold tracking-[1.5px] uppercase py-3 px-4 text-left border-b border-line">Length (in)</th>
                </tr>
              </thead>
              <tbody>
                {SIZES.map(({ size, chest, waist, length }, i) => {
                  const isLast = i === SIZES.length - 1;
                  const tdCls = `py-3 px-4 text-onsurface-300 group-hover:bg-surface-600${isLast ? '' : ' border-b border-line'}`;
                  return (
                    <tr key={size} className="group">
                      <td className={tdCls}>{size}</td>
                      <td className={tdCls}>{chest}</td>
                      <td className={tdCls}>{waist}</td>
                      <td className={tdCls}>{length}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-light-100 flex items-center">
        <div className="py-16 px-12 max-w-[600px] m-auto w-full flex flex-col items-start justify-center gap-12 max-[900px]:py-12 max-[900px]:px-6 max-[900px]:max-w-full">
          <h2 className="section-title text-black">How to Measure</h2>
          <div className="flex flex-col gap-8">
            {STEPS.map(({ num, label, icon, desc }) => (
              <div key={num} className="flex items-start gap-5">
                <div className="w-12 h-12 bg-red text-light-100 font-display text-[1.5rem] flex items-center justify-center flex-shrink-0 rounded-full">{num}</div>
                <div>
                  <strong className="block text-[16px] font-bold text-bg-800 mb-1">{label}</strong>
                  <p className="text-[0.95rem] text-light-700 leading-[1.6]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
