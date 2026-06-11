"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { tours } from "@/data/tours";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const schema = z.object({
  name: z.string().trim().min(1, "お名前を入力してください。"),
  email: z
    .string()
    .trim()
    .min(1, "メールアドレスを入力してください。")
    .regex(EMAIL_RE, "メールアドレスの形式が正しくありません。"),
  phone: z.string().trim().optional(),
  tour: z.string().optional(),
  date: z.string().optional(),
  people: z.string().optional(),
  message: z.string().trim().min(1, "お問い合わせ内容を入力してください。"),
  consent: z
    .boolean()
    .refine((v) => v, { message: "個人情報の取り扱いへの同意が必要です。" }),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const params = useSearchParams();
  const presetTour = params.get("tour") ?? "";
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      tour: presetTour,
      date: "",
      people: "",
      message: "",
      consent: false,
    },
  });

  async function onSubmit(values: FormValues) {
    // TODO: クライアント確認（送信先）。現在はバックエンド未接続のため擬似送信。
    //       実装時は API ルート / フォームサービス（メール送信・予約管理）へ接続する。
    void values;
    await new Promise((r) => setTimeout(r, 700));
    setSubmitted(true);
    reset();
  }

  const fieldBase =
    "mt-1.5 w-full rounded-xl border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent";

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="thanks"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          className="rounded-3xl border border-accent/30 bg-accent/5 p-10 text-center"
        >
          <CheckCircle2 aria-hidden size={48} className="mx-auto text-accent" />
          <p className="mt-4 font-heading text-2xl font-bold text-accent">
            ありがとうございます
          </p>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            お問い合わせを受け付けました。内容を確認のうえ、担当者より折り返しご連絡いたします。
            <br />
            {/* TODO: クライアント確認（自動返信・受付フローの実装） */}
            数日経っても返信がない場合は、お電話でもお問い合わせいただけます。
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-7 rounded-full border border-accent px-6 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white"
          >
            続けて問い合わせる
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={false}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          {/* 名前 */}
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              お名前 <span className="text-red-600" aria-hidden>*</span>
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "err-name" : undefined}
              className={`${fieldBase} ${errors.name ? "border-red-400" : "border-border"}`}
              {...register("name")}
            />
            {errors.name && (
              <p id="err-name" className="mt-1 text-xs text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* メール */}
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                メールアドレス <span className="text-red-600" aria-hidden>*</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "err-email" : undefined}
                className={`${fieldBase} ${errors.email ? "border-red-400" : "border-border"}`}
                {...register("email")}
              />
              {errors.email && (
                <p id="err-email" className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* 電話 */}
            <div>
              <label htmlFor="phone" className="text-sm font-medium">
                電話番号
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                className={`${fieldBase} border-border`}
                {...register("phone")}
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* プログラム選択 */}
            <div>
              <label htmlFor="tour" className="text-sm font-medium">
                ご希望のプログラム
              </label>
              <select id="tour" className={`${fieldBase} border-border`} {...register("tour")}>
                <option value="">未定・相談したい</option>
                {tours.map((t) => (
                  <option key={t.slug} value={t.slug}>
                    {t.title}
                  </option>
                ))}
              </select>
            </div>

            {/* 希望日 */}
            <div>
              <label htmlFor="date" className="text-sm font-medium">
                ご希望日
              </label>
              <input
                id="date"
                type="date"
                className={`${fieldBase} border-border`}
                {...register("date")}
              />
            </div>
          </div>

          {/* 人数 */}
          <div className="max-w-[12rem]">
            <label htmlFor="people" className="text-sm font-medium">
              参加人数
            </label>
            <input
              id="people"
              type="number"
              min={1}
              max={50}
              placeholder="例：2"
              className={`${fieldBase} border-border`}
              {...register("people")}
            />
          </div>

          {/* メッセージ */}
          <div>
            <label htmlFor="message" className="text-sm font-medium">
              お問い合わせ内容 <span className="text-red-600" aria-hidden>*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "err-message" : undefined}
              className={`${fieldBase} resize-y ${
                errors.message ? "border-red-400" : "border-border"
              }`}
              {...register("message")}
            />
            {errors.message && (
              <p id="err-message" className="mt-1 text-xs text-red-600">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* 同意 */}
          <div>
            <label className="flex items-start gap-2.5 text-sm">
              <input
                type="checkbox"
                aria-invalid={!!errors.consent}
                className="mt-1 h-4 w-4 accent-[var(--color-accent)]"
                {...register("consent")}
              />
              <span className="text-text-muted">
                個人情報を、お問い合わせへの対応の目的で利用することに同意します。
                <span className="text-red-600" aria-hidden> *</span>
                {/* TODO: クライアント確認（プライバシーポリシーページへのリンク） */}
              </span>
            </label>
            {errors.consent && (
              <p className="mt-1 text-xs text-red-600">{errors.consent.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-accent-soft disabled:opacity-60 sm:w-auto sm:px-10"
          >
            {isSubmitting ? "送信中..." : "この内容で送信する"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
