import { Reveal } from "./visuals/Reveal";
interface Props {
  number: string;
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  number,
  label,
  title,
  description,
}: Props) {
  return (
    <Reveal className="section-heading">
      <p className="eyebrow">
        <span>{number}</span> {label}
      </p>
      <h2>{title}</h2>
      {description && <p className="section-intro">{description}</p>}
    </Reveal>
  );
}
