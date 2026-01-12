interface Props {
  title?: string;
}

function Header({ title }: Props) {
  return (
    <div>
      <header className="h-20 bg-white shadow flex items-center justify-center">
        <h1 className="text-xl font-semibold text-gray-800 !text-[#002365]">{title || "ヘッダー"}</h1>
      </header>
    </div>
  )
}

export default Header