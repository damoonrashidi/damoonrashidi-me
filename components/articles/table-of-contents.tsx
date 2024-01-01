interface Content {
  id: string;
  label: string;
  children?: Content[];
}

export function TableOfContents({ items }: { items: Content[] }) {
  return (
    <ol className="list-decimal px-4">
      {items.map((item) => (
        <li>
          <a href={`#${item.id}`}>{item.label}</a>
          {item.children ? TableOfContents({ items: item.children }) : <></>}
        </li>
      ))}
    </ol>
  );
}
