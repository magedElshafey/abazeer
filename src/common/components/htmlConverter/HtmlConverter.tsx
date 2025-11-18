interface HtmlConverterProps {
  html: string;
}

const HtmlConverter: React.FC<HtmlConverterProps> = ({ html }) => {
  return (
    <div
      className="prose max-w-full text-[var(--color)] [&_*]:text-[var(--color)]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default HtmlConverter;