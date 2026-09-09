'use client';

import { useState } from 'react';

import type { TitledBody } from '@/content/translations/types';
import { RestorationPanel } from '@/components/ui/RestorationPanel';
import styles from './Process.module.scss';

/**
 * The five written steps and the diagram above them, kept on one piece of
 * state: whichever stage the diagram is showing is also the step highlighted in
 * the list, in both directions. Reading the text and watching the panel are the
 * same act.
 *
 * The step copy arrives already translated from the server component, so this
 * holds no content of its own.
 */
export function ProcessDiagram({ steps }: { steps: TitledBody[] }) {
  const [stage, setStage] = useState(0);

  return (
    <>
      <div data-reveal>
        <RestorationPanel
          stageNames={steps.map((step) => step.title)}
          stage={stage}
          onStageChange={setStage}
        />
      </div>

      <ol className={styles.steps}>
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={styles.step}
            data-current={index === stage || undefined}
            data-reveal
            style={{ '--reveal-delay': `${index * 90}ms` } as React.CSSProperties}
            onMouseEnter={() => setStage(index)}
          >
            <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepBody}>{step.body}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
