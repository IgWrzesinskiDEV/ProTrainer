import { WorkoutPlan } from "@/interfaces/workout/IWorkout";
import { Dispatch, SetStateAction } from "react";
import * as React from "react";
import {
  Select as BaseSelect,
  SelectRootSlotProps,
  SelectProps,
  SelectListboxSlotProps,
} from "@mui/base/Select";
import {
  Option as BaseOption,
  OptionProps,
  OptionOwnerState,
} from "@mui/base/Option";

import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import clsx from "clsx";
import { PopupContext } from "@mui/base/Unstable_Popup";
import { CssTransition } from "@mui/base/Transitions";

export default function PlanSearchSelect({
  workoutPlans,
  selectedPlan,
  setSelectedPlan,
}: {
  workoutPlans: WorkoutPlan[];
  selectedPlan: WorkoutPlan | null;
  setSelectedPlan: Dispatch<SetStateAction<WorkoutPlan | null>>;
}) {
  return (
    <div className="dark ">
      <Select
        value={selectedPlan?._id || ""}
        onChange={(e, newValue) => {
          console.log(newValue);
          console.log(workoutPlans);
          setSelectedPlan(workoutPlans.find((p) => p._id === newValue) || null);
        }}
      >
        <Option value="" className="text-gray-400 font-normal">
          Select a plan
        </Option>
        {workoutPlans.map((plan) => (
          <Option
            key={plan._id}
            value={plan._id}
            className="text-white font-normal py-2"
          >
            {plan.planName}
          </Option>
        ))}
      </Select>
    </div>
  );
}

// export default function PlanSelect({
//   availablePlans,
// }: {
//   availablePlans: string[];
// }) {
//   // Replace this with your app logic for determining dark modes

//   return (
//     <div className="dark ">
//       <Select defaultValue={0}>
//         {availablePlans.map((plan, index) => (
//           <Option key={plan} value={index}>
//             {plan}
//           </Option>
//         ))}
//         {/* <Option value={10}>Documentation</Option>
//         <Option value={20}>Components</Option>
//         <Option value={30}>Features</Option> */}
//       </Select>
//     </div>
//   );
// }

const getOptionColorClasses = ({
  selected,
  highlighted,
  disabled,
}: Partial<OptionOwnerState<string>>) => {
  let classes = "";
  if (disabled) {
    classes += "text-slate-700";
  } else {
    if (selected) {
      classes += " bg-blue-500 text-blue-50";
    } else if (highlighted) {
      classes += " bg-slate-800 text-slate-300";
    }
    if (!selected) {
      classes += " hover:bg-slate-800  hover:text-slate-300 ";
    }

    classes +=
      " focus-visible:outline focus-visible:outline-2 outline-blue-300 ";
  }
  return classes;
};

const Option = React.forwardRef<HTMLLIElement, OptionProps<string>>(
  (props, ref) => {
    Option.displayName = "Option";
    return (
      <BaseOption
        ref={ref}
        {...props}
        slotProps={{
          root: ({ selected, highlighted, disabled }) => ({
            className: `list-none p-2 rounded-lg cursor-pointer last-of-type:border-b-0 ${getOptionColorClasses(
              { selected, highlighted, disabled }
            )}`,
          }),
        }}
      />
    );
  }
);

const Button = React.forwardRef(function Button<
  TValue extends object,
  Multiple extends boolean
>(
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ownerState, ...other } = props;
  return (
    <button type="button" {...other} ref={ref}>
      {other.children}
      <UnfoldMoreRoundedIcon />
    </button>
  );
});

const AnimatedListbox = React.forwardRef(function AnimatedListbox<
  Value extends object,
  Multiple extends boolean
>(
  props: SelectListboxSlotProps<Value, Multiple>,
  ref: React.ForwardedRef<HTMLUListElement>
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ownerState, ...other } = props;
  const popupContext = React.useContext(PopupContext);

  if (popupContext == null) {
    throw new Error(
      "The `AnimatedListbox` component cannot be rendered outside a `Popup` component"
    );
  }

  const verticalPlacement = popupContext.placement.split("-")[0];

  return (
    <CssTransition
      className={`placement-${verticalPlacement}`}
      enterClassName="open"
      exitClassName="closed"
    >
      <ul {...other} ref={ref} />
    </CssTransition>
  );
});

const resolveSlotProps = (fn: unknown, args: unknown) =>
  typeof fn === "function" ? fn(args) : fn;

const Select = React.forwardRef(function CustomSelect<
  TValue extends object | string,
  Multiple extends boolean
>(
  props: SelectProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <BaseSelect
      ref={ref}
      {...props}
      slots={{
        root: Button,
        listbox: AnimatedListbox,
        ...props.slots,
      }}
      className={clsx("CustomSelect", props.className)}
      slotProps={{
        ...props.slotProps,
        root: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `relative text-sm font-sans box-border w-52 px-3 py-2 rounded-lg text-left bg-neutral-900 border border-solid border-neutral-700 text-neutral-300 transition-all hover:bg-neutral-800 outline-0 shadow-md shadow-slate-900 ${
                ownerState.focusVisible
                  ? "focus-visible:ring-4 ring-blue-500/30 border-blue-500"
                  : ""
              } [&>svg]:text-base	[&>svg]:absolute [&>svg]:h-full [&>svg]:top-0 [&>svg]:right-2.5`,
              resolvedSlotProps?.className
            ),
          };
        },
        listbox: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.listbox,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `text-sm font-sans p-1.5 my-3 w-80 rounded-xl overflow-auto outline-0 bg-neutral-900 border border-solid border-slate-700 text-slate-300 shadow shadow-slate-900 [.open_&]:opacity-100 [.open_&]:scale-100 transition-[opacity,transform] [.closed_&]:opacity-0 [.closed_&]:scale-90 [.placement-top_&]:origin-bottom [.placement-bottom_&]:origin-top`,
              resolvedSlotProps?.className
            ),
          };
        },
        popup: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.popup,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx("dark z-10", resolvedSlotProps?.className),
          };
        },
      }}
    />
  );
});
