'use client'

type LongTextInputProps = {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
}

export default function LongTextInput({text, setText}: LongTextInputProps) {
    return (
        <div>
            <fieldset className="form-fieldset">
                <legend className="form-text">Task Description</legend>
                <input 
                    type="text" 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    maxLength={250}
                    className="outline-none "
                    placeholder="..."
                />
            </fieldset>
        </div>
    );
}
