const Navbar = ({ setActiveSection }) => {
  const navStyle = {
    backgroundColor: '#2c3e50',
    padding: '1rem 2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  };

  const brandStyle = {
    color: '#ecf0f1',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none'
  };

  const linkStyle = {
    color: '#ecf0f1',
    margin: '0 1rem',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'all 0.3s ease'
  };

  const linkHoverStyle = {
    backgroundColor: '#3498db',
    color: 'white'
  };

  return (
    <nav style={navStyle}>
      <a href="#" style={brandStyle} onClick={(e) => {
        e.preventDefault();
        setActiveSection('about');
      }}>My Portfolio</a>
      <div>
        <a href="#" style={linkStyle} 
          onClick={(e) => {
            e.preventDefault();
            setActiveSection('about');
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = linkHoverStyle.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
          About
        </a>
        <a href="#" style={linkStyle} 
          onClick={(e) => {
            e.preventDefault();
            setActiveSection('skills');
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = linkHoverStyle.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
          Skills
        </a>
        <a href="#" style={linkStyle} 
          onClick={(e) => {
            e.preventDefault();
            setActiveSection('projects');
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = linkHoverStyle.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
          Projects
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
