import { getGravatar } from "@/lib/utils";
import { expect, test } from "vitest";

const VALID_GRAVATAR_EMAIL = "luisfelipesdn12@gmail.com";
const INVALID_GRAVATAR_EMAIL = "luisfelipesdn12@invalidmail.com";

test("Get gravatar should have entry with valid email", async() => {
    expect(await getGravatar(VALID_GRAVATAR_EMAIL)).toHaveProperty("entry");
});

test("Get gravatar should have error property with invalid email", async() => {
    expect(await getGravatar(INVALID_GRAVATAR_EMAIL)).toHaveProperty("error");
});

test("Get gravatar should have not error property with valid email", async() => {
    expect(await getGravatar(VALID_GRAVATAR_EMAIL)).not.toHaveProperty("error");
});

test("Get gravatar should have profileUrl with valid email", async() => {
    const res = (await getGravatar(VALID_GRAVATAR_EMAIL)).entry[0];
    expect(res.profileUrl).toBeDefined();
});
