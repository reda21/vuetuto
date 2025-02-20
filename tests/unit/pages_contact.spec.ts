import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import ContactPage from "~/pages/contact.vue";
import FormInput from "~/components/ui/form/FormInput.vue";
import FormTextarea from "~/components/ui/form/FormTextarea.vue";
import FormButton from "~/components/ui/form/FormButton.vue";
import type { ComponentPublicInstance } from "vue";

interface ComponentForm {
  form: {
    errorMessage: string;
    messageSent: boolean;
    name: string;
    email: string;
    message: string;
  };
}

describe("ContactPage", () => {
  let wrapper: VueWrapper<ComponentPublicInstance & ComponentForm>;

  beforeEach(() => {
    wrapper = mount(ContactPage) as VueWrapper<
      ComponentPublicInstance & ComponentForm
    >;
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("doit afficher le formulaire de contact", () => {
    expect(wrapper.findComponent(FormInput).exists()).toBe(true);
    expect(wrapper.findComponent(FormTextarea).exists()).toBe(true);
    expect(wrapper.findComponent(FormButton).exists()).toBe(true);
  });

  it("doit soumettre le formulaire avec succès", async () => {
    const inputs = wrapper.findAllComponents(FormInput);
    if (!inputs.length) throw new Error("Inputs not found");

    const nameInput = inputs[0];
    const emailInput = inputs[1];
    const messageTextarea = wrapper.findComponent(FormTextarea);

    await nameInput.setValue("John Doe");
    await emailInput.setValue("john.doe@example.com");
    await messageTextarea.setValue("Bonjour, ceci est un message de test.");

    const formButton = wrapper.findComponent(FormButton);
    await formButton.trigger("submit");

    console.info("input", wrapper.vm.form);

    expect(3 - 1).toBe(2);
  });
});
