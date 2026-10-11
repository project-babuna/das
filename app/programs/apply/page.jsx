import SiteFrame from "../../components/SiteFrame";
import ProgramApplicationForm from "./ProgramApplicationForm";
import { applicationPrograms } from "@/lib/programApplication.mjs";
import { entrySteps } from "../catalog";
import shared from "../Programs.module.css";
import styles from "./Application.module.css";

export const metadata = { title: "Apply to Build & Grow | DreamAndScale", description: "Apply for DreamAndScale Incubation, Accelerator, or Scale-up.", robots: { index: false, follow: true } };
export default function ApplyPage({ searchParams }) {
  const selected = Object.hasOwn(applicationPrograms, searchParams.program || "") ? searchParams.program : "";
  return <SiteFrame><main className={`${shared.page} ${styles.page}`}><div className="container">
    <nav className={shared.breadcrumb} aria-label="Breadcrumb"><a href="/programs">Programs</a><span>/</span><a href="/programs#build-grow">Build &amp; Grow</a><span>/</span><span aria-current="page">Apply</span></nav>
    <div className={styles.layout}>
      <aside className={styles.intro}><h1>Tell us what you’re building.</h1><p>Share your current stage and the support you need.</p>
        <ol className={styles.steps}>{entrySteps.map((step, index) => <li key={step.title}><span>{index + 1}</span><div><h2>{step.title}</h2><p>{step.text}</p></div></li>)}</ol>
        <p className={styles.note}>Submitting an application does not guarantee selection.</p>
      </aside>
      <ProgramApplicationForm key={selected} initialProgram={selected} />
    </div>
  </div></main></SiteFrame>;
}
