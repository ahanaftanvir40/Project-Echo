
function layout({children} : {children:React.ReactNode}) {
  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-retro">
      {children}
    </div>
  )
}

export default layout
