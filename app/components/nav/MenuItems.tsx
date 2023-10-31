interface MenuItemProps {
    children: React.ReactNode;
    onClick: () => void;
}

const MenuItems:React.FC<MenuItemProps> = ({children, onClick}) => {

  return (
      <div onClick={onClick} className="px-4 py-3 hover:bg-neural-100 transition">
          {children}
    </div>
  )
}

export default MenuItems