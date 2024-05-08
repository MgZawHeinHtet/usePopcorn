export default function TextExpander({
  collapasedNumWords,
  expandButtonText,
  collapaseButtonText,
  buttonColor,
  buttonInline,
  className,
  children,
}) {
  return <>{children}
    <span><button>{expandButtonText}</button></span>
  </>;
}
