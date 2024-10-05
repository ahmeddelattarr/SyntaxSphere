interface SignUpContainerProps {
    children: React.ReactNode;
}

const SignUpContainer: React.FC<SignUpContainerProps> = (props) => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-96">{props.children}</div>
        </div>
    )
}

export default SignUpContainer;