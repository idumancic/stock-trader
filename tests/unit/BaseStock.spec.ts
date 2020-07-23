import { mount, createLocalVue, Wrapper } from "@vue/test-utils";
import BootstrapVue, { BButton } from "bootstrap-vue";
import BaseStock from "@/components/BaseStock.vue";
import { Stock } from "@/types";

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.filter("currency", (value: string | number) => {
  return `$${value.toLocaleString()}`;
});

const stock: Stock = { id: 1, name: "test", price: 10 };

describe("@/components/BaseStock.vue", () => {
  let wrapper: Wrapper<BaseStock>;

  beforeEach(() => {
    wrapper = mount(BaseStock, {
      localVue,
      propsData: { stock }
    });
  });

  it("renders title and price", () => {
    expect(wrapper.html()).toContain("test");
    expect(wrapper.html()).toContain(10);
  });

  it("renders stock quantity as zero by default", () => {
    expect((wrapper.vm as any).quantity).toBe(0);
  });

  it("disables action button when quantity is zero", async () => {
    const button = wrapper.findComponent(BButton);
    await wrapper.setData({ quantity: 0 });

    expect(button.element.innerHTML).toContain("Action");
    expect(button.attributes()?.disabled).toBe("disabled");
  });

  it("emits action event on action button click and resets quantity", async () => {
    const button = wrapper.findComponent(BButton);
    await wrapper.setData({ quantity: 2 });

    expect(button.element.innerHTML).toContain("Action");
    expect((wrapper.vm as any).quantity).toBe(2);

    await button.trigger("click");

    expect(wrapper.emitted().action).toBeTruthy();
    expect((wrapper.vm as any).quantity).toBe(0);
  });
});
