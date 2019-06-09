import { container, title } from 'assets/jss/material-kit-react.jsx'

import imagesStyle from 'assets/jss/material-kit-react/imagesStyles.jsx'

const metricLessonStyle = {
  container,
  profile: {
    textAlign: 'center',
    '& img': {
      maxWidth: '160px',
      width: '100%',
      margin: '0 auto',
      transform: 'translate3d(0, -50%, 0)',
    },
  },
  description: {
    margin: '1.071rem auto 0',
    maxWidth: '600px',
    color: '#999',
    textAlign: 'center !important',
  },
  name: {
    marginTop: '-80px',
  },
  ...imagesStyle,
  main: {
    background: '#FFFFFF',
    position: 'relative',
    zIndex: '3',
    height: '100vh',
    margin: '90px 80px',
    borderRadius: '6px',
    padding: '70px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  },
  mainRaised: {
    margin: '-60px 30px 0px',
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  },
  title: {
    ...title,
    display: 'inline-block',
    position: 'relative',
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none',
  },
  socials: {
    marginTop: '0',
    width: '100%',
    transform: 'none',
    left: '0',
    top: '0',
    height: '100%',
    lineHeight: '41px',
    fontSize: '20px',
    color: '#999',
  },
  navWrapper: {
    margin: '20px auto 50px auto',
    textAlign: 'center',
  },
  title: {
    fontSize: '4.2rem',
    fontWeight: '600',
    display: 'inline-block',
    position: 'relative',
    marginBottom: '30px',
    width: '100%',
  },
  root: {
    width: '100%',
  },
  heading: {
    flexShrink: 0,
  },
  column: {
    flexBasis: '50%',
  },
  secondaryHeading: {
    color: 'secondary',
  },
}

export default metricLessonStyle
