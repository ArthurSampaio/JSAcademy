import { container, title } from 'assets/jss/material-kit-react.jsx'
import modalStyle from 'assets/jss/material-kit-react/modalStyle.jsx'
import imagesStyle from 'assets/jss/material-kit-react/imagesStyles.jsx'
const createLessonStyle = {
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
    width: '100%',
  },
  subtitle: {
    fontSize: '1.313rem',
    margin: '10px 0 0',
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
  panelTitle: {
    fontSize: '1.00rem',
  },
  codeContent: {
    padding: '0.250rem 0.5rem',
  },
  infoContent: {
    padding: '0 0.5rem',
  },
  panelContent: {
    margin: '10px 0',
  },
  fab: {
    margin: '2%',
    float: 'right',
    overflow: 'auto',
  },
  textField: {
    flexBasis: 200,
  },
  form: {
    margin: '15px',
    padding: '10px',
  },
  listItemModal: {
    width: '100%',
  },
  ...modalStyle,
  clipboard: {
    margin: '30px',
  },
  clipboardButton: {
    float: 'right',
    padding: '5px',
  },
  headTitle: {
    fontSize: '2rem',
    display: 'inline-block',
    position: 'relative',
    width: '100%',
  },
  margin10: {
    margin: '10px',
  },
  marginTests: {
    marginRight: '10px',
  },
}

export default createLessonStyle
