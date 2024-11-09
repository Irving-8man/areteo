
import { Button } from '@fluentui/react-components';
import { shell } from '@tauri-apps/api'
import { Bug20Filled } from "@fluentui/react-icons";
export default function GitHubButton() {
    const openGitHubRepo = () => {
        shell.open('https://github.com/Irving-8man/areteo/issues/new')
    };
    
    return (
        <Button icon={<Bug20Filled />} className='h-[48px] hover:underline'  appearance='outline' style={{ borderRight:"0px",width: "100%",borderRadius:"0px", justifyContent: "flex-start" }} onClick={openGitHubRepo}>
            <p className='text-sm'>Reportar fallos</p>
        </Button>
    );    
}



