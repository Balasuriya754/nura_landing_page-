// components/QuoteStrip.jsx
export const QuoteStrip = ({ tamil, english, type = 'guilt' }) => (
  <div className={`qs qs--${type}`}>
    <span className="qs-bar" />
    <div className="qs-text">
      <span className="qs-tamil tamil">{tamil}</span>
      <span className="qs-eng">{english}</span>
    </div>
    <span className="qs-bar" />
  </div>
);

export default QuoteStrip;