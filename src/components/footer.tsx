import DarkModeToggle from './DarkModeToggle'

const Footer = () => {
  return (
    <footer className="shadow md:shadow-indigo-500/40 flex w-full justify-end bg-scale-300 p-4 dark:bg-gray-800">
      <DarkModeToggle />
    </footer>
  )
}

Footer.auth = true

export default Footer