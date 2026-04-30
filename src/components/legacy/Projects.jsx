import Button from '../common/Button.jsx';

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: "E-commerce Website",
      description: "A full-featured online store with product listings, cart functionality, and checkout process."
    },
    {
      id: 2,
      name: "Task Management App",
      description: "A productivity application for organizing tasks with drag-and-drop functionality and due date reminders."
    }
  ];

  const handleViewProject = () => {
    alert("Project coming soon!");
  };

  return (
    <div>
      <h2 className="mb-4">My Projects</h2>
      <div className="row">
        {projects.map(project => (
          <div key={project.id} className="col-md-6 mb-4">
            <div className="card h-100 shadow">
              <div className="card-body">
                <h3 className="card-title">{project.name}</h3>
                <p className="card-text">{project.description}</p>
                <Button 
                  text="View Project" 
                  onClick={handleViewProject} 
                  className="mt-3"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
