
interface TagListProps {
  title: string;
  tags: string[];
}

export const TagList: React.FC<TagListProps> = ({ title, tags }) => {
  if (!tags || tags.length === 0) return null;
  
  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-white mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag: string) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full bg-coompass-success/20 px-2.5 py-0.5 text-xs font-medium text-coompass-success"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
