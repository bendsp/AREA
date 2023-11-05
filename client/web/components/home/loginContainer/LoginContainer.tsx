import GitHubIcon from '@mui/icons-material/GitHub';

const GitHubLoginButton = () => {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-col justify-center items-center space-y-1 w-fit"
            onClick={() => {
                window.location.href = "https://github.com/login/oauth/authorize?client_id=469d3830933d3d81b6a9&scope=notifications"
            }}
        >
            <GitHubIcon sx={{ height: "40px", width: "40px" }} />
            <span>Login to GitHub</span>
        </button>
    )
}

function disconnectGitHub() {
    localStorage.removeItem('gitHubToken')
    localStorage.removeItem('githubTokenSent')
    window.location.reload()
}

const GitHubLoggedButton = () => {
    return (
        <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex flex-col justify-center items-center space-y-1 w-fit"
            onClick={() => {disconnectGitHub()}}
        >
            <GitHubIcon sx={{ height: "40px", width: "40px" }} />
            <span>Logged to GitHub</span>
        </button>
    )
}

interface LoginContainerProps {
    gitHubStatus: boolean;
}

const LoginContainer = ({gitHubStatus}: LoginContainerProps) => {
    return (
        <div className="bg-[#1e1e1e] rounded-xl p-5 space-y-4">
            <span className="bg-yellow-500 w-fit rounded-xl px-2 text-xl font-bold text-[#1e1e1e]">
                Login to your services!
            </span>
            <div>
                {gitHubStatus ?
                    <GitHubLoggedButton />
                    :
                    <GitHubLoginButton />
                }
            </div>
        </div>
    )
}

export default LoginContainer
