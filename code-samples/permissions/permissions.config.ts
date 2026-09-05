export type FamilyPermission = "owner" | "editor" | "viewer";

export const permissionLabels: Record<FamilyPermission, string> = {
  owner: "בעלים",
  editor: "עורך",
  viewer: "צפייה בלבד",
};

export const editablePermissions = new Set<FamilyPermission>([
  "owner",
  "editor",
]);
