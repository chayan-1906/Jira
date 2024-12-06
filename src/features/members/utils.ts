import {GetMemberProps} from "@/types";
import {DATABASE_ID, MEMBERS_ID} from "@/config";
import {Query} from "node-appwrite";

export const getMember = async ({databases, workspaceId, userId}: GetMemberProps) => {
    const members = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        [
            Query.equal('workspaceId', workspaceId),
            Query.equal('userId', userId),
        ],
    );

    return members.documents[0];
}

export function snackCaseToUpperCase(string: string) {
    return string.toLowerCase()
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase()).toUpperCase();
}
