import DarkModeToggle from './DarkModeToggle'

const Footer = () => {
  return (
    <footer className="flex w-full justify-end border-t bg-scale-300 p-4 dark:bg-gray-800">
      <DarkModeToggle />
    </footer>
  )
}

Footer.auth = true

export default Footer