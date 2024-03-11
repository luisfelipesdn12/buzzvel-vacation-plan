import TripCard from "@/app/app/trip-card";
import { Plan } from "@/lib/database.types";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

const mockPlan: Plan = {
    id: "15aa699e-61a1-4dc8-9e46-05b09716ceb8",
    user_id: "95e34053-5db3-4375-bb89-52f332c2a453",
    title: "First Plan lala",
    description: "Lorem ipsum dolor sit anet.",
    date: new Date("2024-12-30"),
    location: "São Paulo",
    created_at: new Date("2024-03-10T14:51:55.173971"),
    updated_at: new Date("2024-03-10T14:51:55.173971"),
    participants: [
        {
            id: "86b6ee42-5459-4cfd-8dd0-d1da5942b187",
            plan_id: "15aa699e-61a1-4dc8-9e46-05b09716ceb8",
            name: "Luis Felipe",
            email: "luisfelipesdn12@gmail.com",
            created_at: new Date("2024-03-10T23:52:16.075668"),
            updated_at: new Date("2024-03-10T23:52:16.075668")
        }
    ]
};

test("TripCard must have a heading with the plan title", () => {
    render(<TripCard plan={mockPlan} onAfterAction={() => {}} />);
    expect(screen.getByRole("heading", { name: mockPlan.title })).toBeDefined();
});

test("TripCard with 1 participant should be in singular", () => {
    render(<TripCard plan={mockPlan} onAfterAction={() => {}} />);
    expect(screen.getAllByText("1 participant")[0]).toBeDefined();
});

test("TripCard with 1 participant should not to be in plural", () => {
    render(<TripCard plan={mockPlan} onAfterAction={() => {}} />);
    expect(() => screen.getAllByText("1 participants")[0]).toThrowError();
});
