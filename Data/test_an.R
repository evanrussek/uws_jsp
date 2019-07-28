setwd("/Users/evanrussek/uws_jsp/data")

library(dplyr)
library(tidyr)
library(ggplot2)

# read in data
data <- read.csv("evan_train_data_edit.csv")

# get choice trials, add best outcome, gain/loss, select relevant rows
cdf <- data %>%
  filter(grepl("CHOICE", phase)) %>%
  mutate(choice = chosen_machine, outcome = outcome_reached,
        correct =  1*(correct_response == "TRUE"), CA = C1, CB = C2) %>%
        unite("CN", CA, CB) %>%
  mutate(C_best = case_when(
                  o1_val > o2_val ~ 1,
                  o1_val < o2_val ~ 2
                  ),
         gain = case_when(o1_val > 0 | o2_val > 0 ~ 1,
                          o1_val < 0 | o2_val < 0 ~ 0)) %>%
         select(choice, outcome, correct, rt, C1, C2, CN, C_best, gain)

ntrials <- dim(cdf)[1]

# add trial number and whether it's the first or second rating
cdf <- cdf %>%
        mutate(trial = 1:ntrials) %>%
        mutate(rep_number = case_when(
                                  trial <= ntrials/2 ~ 1,
                                  trial > ntrials/2 ~2
        ))

cdf_summ1 <- cdf %>%
  group_by(CN, rep_number) %>%
  summarize_at(vars(correct, rt), funs(mean(.,na.rm=TRUE)))

corr_plot <- ggplot(cdf_summ1, aes(x=rep_number, y = correct, group = CN)) +
  geom_point() + geom_line() + facet_wrap(~ CN) + ylim(0,1)

rt_plot <- ggplot(cdf_summ1, aes(x=rep_number, y = rt, group = CN)) +
  geom_point() + geom_line() + facet_wrap(~ CN) + ylim(800,3000)

ggsave("plots/evan_pct_corr.png", corr_plot)
ggsave("plots/evan_rt.png", rt_plot)





  