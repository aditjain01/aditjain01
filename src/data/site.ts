// Single source of truth for identity and links.
// Values starting with "TODO(adit)" render as visible placeholders, not links.
export const site = {
  name: 'Adit Jain', // TODO(adit): confirm preferred display name
  title: 'Adit Jain, production agent systems',
  description:
    'Senior AI engineer and product owner building production agent systems and the infrastructure under them.',
  github: 'https://github.com/aditjain01',
  linkedin: 'TODO(adit): LinkedIn URL',
  email: 'TODO(adit): email address',
  resume: 'TODO(adit): resume PDF',
  resumeFile: '', // set to e.g. '/resume.pdf' once the file is in /public
  employerDisplay: 'a large health insurer’s Medicare business', // TODO(adit): name the employer or keep generic
};

export const isTodo = (v: string) => v.startsWith('TODO(adit)');
