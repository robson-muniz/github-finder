export type GithubUser = {
    login: string;
    name: string;
    id: number;
    avatar_url: string;
    html_url: string;
    bio: string | null;
    public_repos: number;
    followers: number;
    following: number;
    location: string | null;
    created_at: string;
}