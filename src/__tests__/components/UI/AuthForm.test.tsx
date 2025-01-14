import { signup } from "@/actions/auth-actions";
import { createUser } from "@/lib/user";
import { hashUserPassword } from "@/util/hash";
import { ObjectId } from "mongodb";

// Mock the createUser function
jest.mock("@/libs/user", () => ({
  createUser: jest.fn().mockResolvedValue({
    userName: "test",
    email: "test@pdasda.pl",
    password:
      "da3497e9e1f25d64eebfd976ae301fea5ad7eff4003e90ba541df1500cbdc68e4555ab0870317d37082c53f73d8c753ed2fb74fe4c15179ce27f8255d49782f4:c98546f6cb2e8e22f2dc42f8dc2f6a6a",
    role: "user",
    _id: new ObjectId("6785b7350d0af107f0e01371"),
    __v: 0,
  }),
}));

// Mock the hashUserPassword function
jest.mock("@/util/hash", () => ({
  hashUserPassword: jest.fn().mockReturnValue("hashedPassword:salt"),
}));

describe("signup", () => {
  it("should call createUser with correct arguments and return an object with the same properties", async () => {
    const formData = new FormData();
    formData.append("email", "testuser@example.com");
    formData.append("password", "password123");
    formData.append("username", "testuser");

    const result = await signup({}, formData);

    expect(createUser).toHaveBeenCalledWith({
      email: "testuser@example.com",
      password: "hashedPassword:salt",
      userName: "testuser",
      role: "user",
    });

    expect(result).toMatchObject({
      userName: "test",
      email: "test@pdasda.pl",
      password:
        "da3497e9e1f25d64eebfd976ae301fea5ad7eff4003e90ba541df1500cbdc68e4555ab0870317d37082c53f73d8c753ed2fb74fe4c15179ce27f8255d49782f4:c98546f6cb2e8e22f2dc42f8dc2f6a6a",
      role: "user",
      _id: expect.any(ObjectId),
      __v: 0,
    });
  });
});
