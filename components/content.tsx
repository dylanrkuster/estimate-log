interface ContentProps {
  title: string;
}

export default function Content({ title }: ContentProps) {
  return (
    <div className="pt-48 flex justify-center items-center">
      <h1 className="text-black text-6xl">{title}</h1>
    </div>
  );
}
