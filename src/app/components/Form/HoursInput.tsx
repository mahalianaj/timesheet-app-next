'use client'
export default function HoursInput({hours, setHours}) {
    return (
        <div>
            <fieldset className="form-fieldset">
                <legend className="form-text">Hours<span className="text-red-600"> *</span></legend>
                    <input 
                        type="number" 
                        step={"0.5"} 
                        min={"0.5"}
                        className="outline-none"
                        required
                        onInvalid={(e) => e.target.setCustomValidity('Record Hours here')}
                        onInput={e => e.target.setCustomValidity('')}
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}>
                    </input>
            </fieldset>
        </div>
    )
}