import styles from '../../styles/loading-dots.module.css'

export default function LoadingDots({ color = '#000' }) {
  return (
    <span className={styles.loading}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  )
}