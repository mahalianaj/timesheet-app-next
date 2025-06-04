'use client'
export default function ProjectSelector({selectedProject, setSelectedProject, 
                                         newProject, setNewProject,
                                        projects}) {
    return (
        <div>
            <fieldset className="form-fieldset">
                <legend className="form-text">Project <span className="text-red-600"> *</span></legend>
                    <select 
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(e.target.value)}
                        required
                        className="form-select outline-none"
                        >
                            <option value="" disabled className="text-gray-400">--Select a project--</option>
                                {projects.map((p) => (
                                    <option key={p.Id} value={p.project}> 
                                        {p.project}
                            </option>
                            ))}
                            <option value="custom" className="">Add new project...</option>
                    </select>
                    {selectedProject === 'custom' && (
                    <div>
                        <div>
                            <input
                                type="text"
                                required
                                placeholder="Enter new project name"
                                onInvalid={(e) => e.target.setCustomValidity('Enter Project here')}
                                onInput={(e) => e.target.setCustomValidity('')}
                                value={newProject}
                                onChange={(e) => setNewProject(e.target.value)}
                                className="outline-none border-r shadow-md p-2 mt-1 rounded-md"
                            />
                        </div>
                    </div>
                )}
            </fieldset>
        </div>
    );
}