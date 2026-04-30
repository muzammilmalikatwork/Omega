const Skills = () => {
  const skills = ["HTML", "CSS", "JavaScript", "React", "Bootstrap", "Git", "Responsive Design", "UI/UX"];

  return (
    <div>
      <h2 className="mb-4">My Skills</h2>
      <div className="d-flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <span 
            key={index} 
            className="badge bg-primary p-3 fs-6"
            style={{ borderRadius: '20px' }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Skills;
