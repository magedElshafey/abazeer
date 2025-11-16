interface HtmlConverterProps {
  html: string;
}

const HtmlConverter: React.FC<HtmlConverterProps> = ({ html }) => {
  return (
    <div
      className="prose max-w-full"
      style={{
        color: "var(--color)"
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default HtmlConverter;
