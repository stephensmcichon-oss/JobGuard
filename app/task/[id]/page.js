'use client';
import styles from './TaskDetail.module.css';

export default function TaskDetail({ params }) {
  // Mock data assuming id is passed
  
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.breadcrumbs}>
          Projects › Core Infrastructure
        </div>
        
        <div className={styles.header}>
          <h1 className={styles.title}>Architectural Review of Data Migration Pipeline v2</h1>
          <button className={styles.closeBtn}>✕</button>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <span>Description</span>
            <span style={{ cursor: 'pointer' }}>✎ Edit</span>
          </div>
          <p className={styles.description}>
            The current data pipeline handles approximately 50k events per second. We need to evaluate the transition to the new stream-processing engine to handle peak loads of 150k. This review should cover data consistency protocols, latency overhead, and cost projections for the AWS Kinesis scaling.
          </p>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <span>Subtasks (4)</span>
            <span style={{ backgroundColor: 'var(--accent-black)', color: 'white', padding: '0.1rem 0.5rem', borderRadius: '4px', fontSize: '0.65rem' }}>50% COMPLETE</span>
          </div>
          <div className={styles.subtaskList}>
            <div className={`${styles.subtaskItem} ${styles.completed}`}>
              <input type="checkbox" className={styles.checkbox} checked readOnly />
              <span>Analyze existing latency bottlenecks</span>
            </div>
            <div className={`${styles.subtaskItem} ${styles.completed}`}>
              <input type="checkbox" className={styles.checkbox} checked readOnly />
              <span>Draft new shard mapping strategy</span>
            </div>
            <div className={styles.subtaskItem}>
              <input type="checkbox" className={styles.checkbox} />
              <span>Conduct load test in staging environment</span>
            </div>
            <div className={styles.subtaskItem}>
              <input type="checkbox" className={styles.checkbox} />
              <span>Finalize cost estimation spreadsheet</span>
            </div>
          </div>
          <div className={styles.addSubtask}>
            <span>+</span> Add a subtask
          </div>
        </div>

        <div className={styles.commentBox}>
          <span className={styles.commentIcon}>😊</span>
          <input type="text" placeholder="Write a comment..." className={styles.commentInput} />
          <span className={styles.commentIcon}>📎</span>
          <div className={styles.sendBtn}>➤</div>
        </div>
      </div>

      <div className={styles.infoPanel}>
        <div className={styles.infoCard}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>ⓘ Status</span>
            <span style={{ backgroundColor: 'var(--accent-black)', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>IN REVIEW</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>👤 Assignee</span>
            <span className={styles.infoValue}>Alex Miller <div style={{width: '24px', height: '24px', backgroundColor: '#2b8a3e', borderRadius: '50%'}}></div></span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>❗ Priority</span>
            <span className={styles.infoValue} style={{color: 'var(--status-urgent-text)'}}>✱ URGENT</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>📅 Due Date</span>
            <span className={styles.infoValue}>Oct 24, 2023</span>
          </div>
        </div>

        <div className={styles.timeWidget}>
          <div className={styles.widgetHeader}>
            <span className={styles.widgetTitle}>Live Time Tracking</span>
            <span className={styles.statusBadge}>IN PROGRESS</span>
          </div>
          
          <div className={styles.timerDisplay}>
            <span className={styles.timerValue}>04:12:45</span>
            <div className={styles.timerPauseBtn}>⏸</div>
          </div>

          <div className={styles.widgetCard}>
            <div>
              <div className={styles.widgetSectionTitle}>Manual Entry</div>
              <div className={styles.manualEntry}>
                <input type="text" placeholder="0h 00m" className={styles.manualInput} />
                <button className={styles.logBtn}>LOG</button>
              </div>
            </div>

            <div>
              <div className={styles.widgetSectionTitle}>Team Contribution</div>
              <div className={styles.teamList}>
                <div className={styles.teamMember}>
                  <div className={styles.memberLeft}>
                    <div className={styles.memberAvatar}>AM</div>
                    Alex M.
                  </div>
                  <div className={styles.memberTime}>12.5h</div>
                </div>
                <div className={styles.teamMember}>
                  <div className={styles.memberLeft}>
                    <div className={styles.memberAvatar}>SJ</div>
                    Sarah J.
                  </div>
                  <div className={styles.memberTime}>4.2h</div>
                </div>
              </div>
            </div>

            <div className={styles.totalTime}>
              <span>Total Spent</span>
              <span className={styles.totalValue}>19.5h</span>
            </div>
          </div>
        </div>
        
        <div style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xl)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Labels</span>
            <span style={{ fontSize: '1.2rem', cursor: 'pointer' }}>+</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ backgroundColor: 'var(--bg-secondary)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>INFRASTRUCTURE</span>
            <span style={{ backgroundColor: 'var(--bg-secondary)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>BACKEND</span>
          </div>
        </div>
      </div>
    </div>
  );
}
